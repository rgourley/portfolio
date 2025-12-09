---
title: "Quickly Find All Font Sizes Used on a Web Page: How-To Guide"
description: "Product Design Leader with experience at Apple, Kraken, Axure, and multiple design patents. Specializes in integrating AI to enhance user experiences across desktop, web, mobile, and SmartTV products."
date: "2024-07-17"
image: "/images/image-7199fe63.jpg"
tags: ["design","product design"]
---

As designers, we often need to audit an existing product to improve the overall UX, or to start a design system. I was looking for an easy way to get all of the font styles from a webpage and couldn't find a great existing solution. I wrote this JavaScript snippet that retrieves all font sizes, weights, and more in use on a webpage. This guide will walk you through using this tool directly in your browser’s Developer Tools (DevTools). Hopefully it will help if you are looking to gather all font styles from a page.

## Prerequisites

Ensure you are familiar with your browser’s Developer Tools. For this guide, we will assume you are using Google Chrome, but the process should be similar in other browsers.

#### Using the Script in DevTools

- **Open DevTools**: Right-click on your webpage and select ‘Inspect’ or press **Ctrl+Shift+I** (Windows/Linux) or **Cmd+Opt+I** (Mac) to open DevTools.
- **Navigate to Console**: Click on the ‘Console’ tab. This is where we will be working.
- **Copy and Paste the Script**: Below is the JavaScript snippet. Copy it.

```

(() =&gt; {
    const fontStyles = {};

    document.querySelectorAll('*').forEach(node =&gt; {
        const computedStyle = window.getComputedStyle(node);

        const fontSize = `${parseFloat(computedStyle.getPropertyValue('font-size'))}px`;
        const fontFamily = computedStyle.getPropertyValue('font-family'); // Preserve full font list
        const fontWeight = computedStyle.getPropertyValue('font-weight');
        const lineHeight = computedStyle.getPropertyValue('line-height');

        if (!fontStyles[fontFamily]) {
            fontStyles[fontFamily] = new Set();
        }

        fontStyles[fontFamily].add(`font-size: ${fontSize}; font-weight: ${fontWeight}; line-height: ${lineHeight};`);
    });

    const sortedFontStyles = [];

    Object.keys(fontStyles).sort().forEach(key =&gt; {
        const rules = Array.from(fontStyles[key]).sort((a, b) =&gt; a.localeCompare(b)); // Sort alphabetically
        const className = CSS.escape(key).replace(/\s+/g, '-').toLowerCase(); // Safe CSS class name

        sortedFontStyles.push(`.font-family-${className} {\n font-family: '${key}';\n ${rules.join('\n ')}\n}`);
    });

    const output = sortedFontStyles.join('\n\n');

    console.log("%cExtracted Font Styles:", "color: cyan; font-weight: bold;");
    console.log(output);

    return output;
})();

```

- **Run the Script**: Paste the script into the console and press Enter. The script will execute, and the results will be printed directly in the console.

## Understanding the Output

The script outputs CSS-like rules for each font family found on the page, including all unique combinations of font size, font weight, and line height applied. Each rule is a class that you can use to reference the specific style combination.

```

.font-family-arial {
  font-family: 'Arial';
  font-size: 14px; font-weight: 400; line-height: 20px;
  font-size: 16px; font-weight: 700; line-height: 24px;
}

.font-family-times-new-roman {
  font-family: 'Times New Roman';
  font-size: 18px; font-weight: 400; line-height: 28px;
  font-size: 20px; font-weight: 400; line-height: 32px;
}

```

## Using the Data

With this data, you can:

- **Audit Your Styles**: Ensure that your webpage is using a consistent and optimized set of font styles.
- **Clean Up**: Identify and remove unused or redundant styles to improve performance.
- **Standardize**: Use the data to create a standardized style guide for your webpage or application.

This JavaScript snippet provides a powerful tool for web developers and designers to understand and optimize the typographic elements of their websites. By using your browser's DevTools and the provided script, you can quickly and easily extract a comprehensive list of all font styles in use on a page, aiding in consistency, performance optimization, and design standardization.
