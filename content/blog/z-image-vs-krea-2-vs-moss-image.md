---
title: "MOSS-Image vs Z-Image Turbo vs Krea 2: Which Is Best?"
seoTitle: "MOSS-Image vs Z-Image Turbo vs Krea 2: Which Is Best?"
description: "MOSS-Image, Z-Image Turbo and Krea 2 on the same nine prompts and seeds. Which looks most like a film, which follows the prompt, and which is fastest."
date: "2026-10-31"
image: "/images/zimage-krea-moss/rain-moss-2121.jpg"
tags: ["AI images","ComfyUI"]
---

I ran [MOSS-Image](https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT), [Z-Image Turbo](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo) and Krea 2 Turbo on the same nine prompts and seeds to see which free image model is best. None of them wins outright. Krea 2 makes the frames that look most like a film. MOSS-Image follows the prompt most closely, down to where a car sits and which way a head turns. Z-Image Turbo is the fastest, about 8 seconds an image against 12 for Krea and 14 for MOSS, but its frames look the most like stock photos.

All three run at home on a 16 GB card. MOSS-Image is the newest, released by OpenMOSS two weeks ago. Every prompt is a person in the middle of something, with the light spelled out. The seeds and the size stay the same, so the only thing that changes is the model.

| | MOSS-Image | Z-Image Turbo | Krea 2 Turbo |
|---|---|---|---|
| Median time per image | 14.1s | 8.1s | 12.2s |
| Steps | 25 | 8 | 8 |
| Best at | Following the prompt, contrast | Speed | Film look, soft backgrounds |
| Weak spot | Overdoes details like makeup | Sharp backgrounds, even light | Drifts on period details |
| License | Apache 2.0 | Apache 2.0 | Krea community license |

## How I tested them

All 54 images are 1536×864, which is exact 16:9, on two seeds, on an RTX 5080 with 16 GB. Each model ran at its usual settings. Z-Image and Krea took 8 steps at CFG 1, the defaults I [tested for Z-Image](/blog/z-image-turbo-best-settings). MOSS took 25 steps at CFG 2.5 with the er_sde sampler, which is what ComfyUI's own MOSS template uses, with its recommended negative prompt and the prompt rewriter turned off. The median time per image was 8.1 seconds for Z-Image, 12.2 for Krea and 14.1 for MOSS.

Every prompt ends the same way, describing a film frame instead of naming a camera. The night scenes use fast tungsten film:

```text
film still from a feature film, oval anamorphic bokeh, the subject razor sharp and the background dissolved into large soft out-of-focus shapes and glowing color, soft rolled-off highlights with a faint halation glow, muted desaturated color grade with deep rich shadows, 35mm motion picture film, fine grain
```

## The nine scenes, side by side

Each scene opens on Z-Image. Click a thumbnail to swap in Krea or MOSS, and switch seeds under it.

### The commander in the snow

:::models
src: /data/zimage-krea-moss.json
scene: winter
:::

Z-Image put her in a full suit of plate armor when the prompt asked for a breastplate over a quilted coat, and it kept the soldiers behind her in sharp focus. Krea got the costume right, added falling snow, and left the crowd soft behind her. MOSS drew the cut on her cheekbone most clearly, and it's the only one where she looks off to the side like the prompt asked.

```text
medium shot of a young woman commander standing in a snowy village square after a battle, a dented steel breastplate over a quilted dark red gambeson, a gray wool hood pushed back, short cropped hair, a fresh cut on her cheekbone, gloved hand gripping a tall wooden torch staff, looking off to the left of frame, jaw set, soldiers in hoods and mail out of focus behind her, soft flat light from a white overcast winter sky evenly lighting her face, the burning torches behind her adding a faint warm edge to the steel, a dark wooden palisade wall behind going cold and gray, desaturated palette, long 135mm anamorphic lens, film still from a feature film, oval anamorphic bokeh, the subject razor sharp and the background dissolved into large soft out-of-focus shapes and glowing color, soft rolled-off highlights with a faint halation glow, muted desaturated color grade with deep rich shadows, 35mm motion picture film, fine grain
```

### The war camp on the beach

:::models
src: /data/zimage-krea-moss.json
scene: beach
:::

All three got the haze. Krea built the most atmosphere but turned the war galleys into Viking dragon ships. MOSS drew sailing ships from a much later century. Z-Image's crew is sharp and evenly lit, which flattens the frame.

```text
medium wide shot of a gray-bearded warrior in a worn dark leather vest on a misty beach war camp, a curved dagger at his belt, glancing back over his shoulder toward the camera, wet hair, sweat on his arms, tents of patched cloth and men hauling ropes soft behind him, two beached wooden war galleys with tall masts fading into white sea haze, soft diffused morning light from the bright hazy sky behind him, his face in gentle shade, the haze glowing white and swallowing the far ships, desaturated, long 135mm anamorphic lens, film still from a feature film, oval anamorphic bokeh, the subject razor sharp and the background dissolved into large soft out-of-focus shapes and glowing color, soft rolled-off highlights with a faint halation glow, muted desaturated color grade with deep rich shadows, 35mm motion picture film, fine grain
```

### 1930s rain

:::models
src: /data/zimage-krea-moss.json
scene: rain
:::

I asked for black and silver. Z-Image went warm brown anyway. Krea did straight noir, with the lamp behind him lighting every streak of rain. MOSS is the darkest, and it's the only one that put the car's fender in the right foreground, where the prompt put it.

```text
medium shot of an older man in a dark wool overcoat and fedora standing on a city street at night in heavy rain in the 1930s, a single streetlamp far behind him backlighting the rain into bright silver streaks and outlining his shoulders and hat, his face lit softly from the left by a dim shop window out of frame, water beading on his hat brim, the street beyond the lamp in darkness, the dark rounded fender of a 1930s car out of focus in the right foreground, another man in a hat blurred walking away behind him, black and silver palette, long 135mm anamorphic lens, film still from a feature film, oval anamorphic bokeh, the subject razor sharp and the background dissolved into large soft out-of-focus shapes and glowing color, soft rolled-off highlights with a faint halation glow, muted desaturated color grade with deep rich shadows, fast tungsten 35mm motion picture film, fine grain
```

### The paramedic

:::models
src: /data/zimage-krea-moss.json
scene: paramedic
:::

The prompt says "her." On seed 2121, Z-Image drew a young man in firefighter gear. Krea pulled back to a wide shot with her small in the frame and the emergency lights melted into soft blobs. MOSS framed her closest, with red and blue smeared across the wet road behind her.

```text
medium shot of a tired young paramedic sitting on the back step of an ambulance on a highway shoulder at night, a silver thermal blanket over her shoulders, hands wrapped around a paper cup, staring at something off frame, light rain, her face lit by the cold white light from inside the open ambulance behind her, red and blue emergency lights flashing across her cheek and the wet road, firefighters moving soft in the dark background, long 135mm anamorphic lens, film still from a feature film, oval anamorphic bokeh, the subject razor sharp and the background dissolved into large soft out-of-focus shapes and glowing color, soft rolled-off highlights with a faint halation glow, muted desaturated color grade with deep rich shadows, fast tungsten 35mm motion picture film, fine grain
```

### The climber at dawn

:::models
src: /data/zimage-krea-moss.json
scene: climber
:::

Krea is the only model that blurred the background the way the prompt asked. The tents and climbers behind her turn into shapes of color. Z-Image's version could sell a parka. MOSS put the sun in the frame and made it a sunset, which is dramatic but isn't dawn.

```text
close medium shot of a female mountaineer at a high camp at dawn, frost on her eyebrows and the fur trim of her hood, cracked lips, goggles pushed up on her forehead, looking up toward the summit out of frame, climbers and orange tents small and out of focus behind her on the snow, the first low warm sunlight from the right hitting one side of her face, the other side and the snow behind her still in cold blue shadow, long 135mm anamorphic lens, film still from a feature film, oval anamorphic bokeh, the subject razor sharp and the background dissolved into large soft out-of-focus shapes and glowing color, soft rolled-off highlights with a faint halation glow, muted desaturated color grade with deep rich shadows, 35mm motion picture film, fine grain
```

### The chef in the alley

:::models
src: /data/zimage-krea-moss.json
scene: chef
:::

The closest race of the nine. Z-Image drew his breath in the cold air and big round lights in the dark. MOSS went heaviest on the stains and the blue of the alley. Krea is the darkest of the three.

```text
medium shot of a middle-aged chef stepping out the back door of a busy restaurant kitchen into a narrow alley at night, stained white jacket, sleeves rolled up, a burn on his forearm, exhaling and looking down the alley, harsh white kitchen light spilling out of the doorway behind him and rimming his shoulders and the side of his face, cooks moving soft through the steam inside, the alley ahead of him in deep blue darkness, wet pavement catching the doorway light, 50mm anamorphic lens, film still from a feature film, oval anamorphic bokeh, the subject razor sharp and the background dissolved into large soft out-of-focus shapes and glowing color, soft rolled-off highlights with a faint halation glow, muted desaturated color grade with deep rich shadows, fast tungsten 35mm motion picture film, fine grain
```

### The taxi at night

:::models
src: /data/zimage-krea-moss.json
scene: taxi
:::

Another close one. All three got the streetlight sliding across her face. MOSS took "mascara slightly smudged" much too far on seed 3434. Krea kept the most of the cab in darkness.

```text
medium close-up of a young woman in the back seat of a taxi at night, shot from the opposite seat, her head against the window, mascara slightly smudged, lost in thought, orange and white streetlight sliding across her face through the window as the city streaks past, the rest of the cab in darkness, the soft dark shape of the front seat in the foreground, 50mm anamorphic lens, film still from a feature film, oval anamorphic bokeh, the subject razor sharp and the background dissolved into large soft out-of-focus shapes and glowing color, soft rolled-off highlights with a faint halation glow, muted desaturated color grade with deep rich shadows, fast tungsten 35mm motion picture film, fine grain
```

### The trawler in a storm

:::models
src: /data/zimage-krea-moss.json
scene: trawler
:::

Z-Image dropped big orange circles into a gray daytime sky. That's what "oval anamorphic bokeh" turns into when there's no light to blur. Krea got the spray coming over the rail. MOSS is the grittiest, with the net piled on the deck.

```text
medium shot of an old fishing boat captain in a yellow oilskin jacket on the deck of a trawler in a gray storm, sea spray on his face and beard, gripping the rail, looking out at the waves off frame, crew in orange gear hauling a net out of focus behind him, soft cold light from a heavy gray overcast sky above, wet highlights on his oilskin and the deck, the sea behind him dark slate gray, desaturated, long 135mm anamorphic lens, film still from a feature film, oval anamorphic bokeh, the subject razor sharp and the background dissolved into large soft out-of-focus shapes and glowing color, soft rolled-off highlights with a faint halation glow, muted desaturated color grade with deep rich shadows, 35mm motion picture film, fine grain
```

### The soldier at golden hour

:::models
src: /data/zimage-krea-moss.json
scene: soldier
:::

MOSS has the best backlight. The low sun turns the dust gold behind him. Krea went blue and cold for a golden hour scene. Z-Image's soldier walks at the camera holding his helmet like a product shot.

```text
medium shot of a young soldier in modern desert combat gear standing in a dusty village street at golden hour, helmet off and hanging from one hand, dust on his face, squinting at something off frame, other soldiers and a parked armored truck out of focus behind him, the low sun directly behind him backlighting the dust in the air and rimming his hair, his face in soft shade filled by warm light bouncing off the dusty ground, warm muted palette, long 135mm anamorphic lens, film still from a feature film, oval anamorphic bokeh, the subject razor sharp and the background dissolved into large soft out-of-focus shapes and glowing color, soft rolled-off highlights with a faint halation glow, muted desaturated color grade with deep rich shadows, 35mm motion picture film, fine grain
```

## Which one should you use?

For a quick draft, Z-Image. It's the fastest, and the light is right most of the time. When the frame has to look like a film, Krea. Read its license first, though, because it limits commercial use above a revenue threshold. I compared it with Z-Image on shorter prompts in [an earlier post](/blog/z-image-turbo-vs-krea-2-turbo). MOSS is Apache 2.0 like Z-Image, and it's the one I'd pick when the blocking matters, when someone has to stand in a particular spot or look a particular way.

Copy any prompt above and swap in your own person and place. Keep the light and the ending.
