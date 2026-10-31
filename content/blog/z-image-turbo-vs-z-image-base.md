---
title: "Z-Image Turbo vs Z-Image base: does the slow model look more real?"
seoTitle: "Z-Image Turbo vs Z-Image Base: 5 Real Tests on 16 GB"
description: "Five new prompts, same seeds, on a 16 GB RTX 5080. Base looks more like everyday snapshots; Turbo is 3x faster, more polished, and better at keeping the subject in frame."
date: "2026-10-30"
image: "/images/zimage-turbo-vs-base/zimage-turbo-vs-base-hero.jpg"
tags: ["AI images","ComfyUI"]
---

In my [Z-Image Turbo vs FLUX 3 klein test](/blog/z-image-turbo-vs-flux-3-klein), Turbo won the polished portraits but kept making everyday scenes look like magazine shots. So I tested the non-Turbo model, **Z-Image base**, which takes more steps and, unlike Turbo, accepts a **negative prompt**. Five new prompts this time: a kitchen, food, a street at night, a workshop and a birthday party.

**Short answer:** Base looks more like ordinary, unstaged photos: wider framing, plainer light, real clutter. Turbo is **about 3 times faster**, more polished, and more reliable at keeping your subject front and center. Base missed the subject entirely in one test and took one prompt far too literally.

![Z-Image Turbo (top row) vs Z-Image base (bottom row), five prompts, same seeds](/images/zimage-turbo-vs-base/zimage-turbo-vs-base-overview.jpg#wide)

## Pick this if...

| You want | Pick | Why |
|---|---|---|
| Fast, polished, subject-focused images | **Turbo** | ~10 s per image, warm light, the subject fills the frame |
| Plain, everyday, "someone just took this" photos | **Base** | Wider, more cluttered, flatter light, less styled |
| To train a LoRA (a person, a product, a style) | **Base** | LoRAs are usually trained on the base model |
| Predictable results on the first try | **Turbo** | Base missed or over-interpreted 2 of 5 prompts |

## How I tested

- **Hardware:** RTX 5080 (16 GB VRAM), 32 GB RAM, Windows 11, ComfyUI.
- **Models:** `z_image_turbo_bf16` ([Z-Image Turbo](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo)) and `z_image_bf16` ([Z-Image base](https://huggingface.co/Tongyi-MAI/Z-Image)), both 11.5 GB, sharing the same Qwen3 4B text encoder (fp8) and VAE. No LoRAs.
- **Turbo settings:** 8 steps, CFG 1, `res_multistep`, shift 3, no negative prompt (Turbo doesn't use one).
- **Base settings:** 25 steps, CFG 4, `res_multistep`, shift 3, negative prompt: *studio lighting, professional photo, retouched, airbrushed, model pose, perfect skin, bokeh, cinematic, magazine, chinese text, signage text, text overlay, watermark, deformed, extra fingers*.
- **Fairness:** same prompt and same seed for both models, 832×1040 (4:5). Every image is a one-shot: first seed only, no re-rolls, no cherry-picking, no inpainting or upscaling. Each model ran at its recommended settings, which means base got a negative prompt and Turbo didn't. That's part of the comparison: it's the main thing base offers.
- **Tested:** October 30, 2026.

## The 5 tests

### 1. Grandmother baking bread

> *a grandmother in her seventies kneading bread dough in a small farmhouse kitchen, flour on her hands and apron, afternoon window light, wooden table, everyday moment*

![Bread kitchen: Z-Image Turbo left, Z-Image base right](/images/zimage-turbo-vs-base/zimage-turbo-vs-base-bread-kitchen.jpg#wide)

Turbo gives a warm, golden, beautifully lit close shot, with flour drifting through the light and convincing hands in the dough. Lovely, but it looks like a cookbook. Base pulls back to a plain kitchen with flat light, dated wood cabinets and a microwave on the counter. It looks like a family photo. Both get the hands right. **More real: base. More editorial: Turbo.**

### 2. Ramen at a diner

> *a bowl of ramen with a soft-boiled egg on a diner counter in Ohio, steam rising, chopsticks resting on the bowl, overhead fluorescent light, casual snapshot of food*

![Ramen diner: Z-Image Turbo left, Z-Image base right](/images/zimage-turbo-vs-base/zimage-turbo-vs-base-ramen-diner.jpg#wide)

The settings land: Turbo puts the bowl in a believable strip-mall diner, and base gets the greenish fluorescent cast and a chipped, worn counter. The food is the weak spot in both. The eggs are too perfect, the noodles too uniform, and Turbo's bowl in particular looks a bit like plastic display food. A food-specific negative prompt (something like *plastic food, wax, food styling, CGI*) would likely help; I kept this as a one-shot rather than re-running. **Edge: base**, for the setting.

### 3. Rainy crosswalk at night

> *a woman with a clear umbrella waiting at a crosswalk on a rainy city street in Chicago at night, neon and traffic light reflections on wet pavement, seen from across the street*

![Rainy crosswalk: Z-Image Turbo left, Z-Image base right](/images/zimage-turbo-vs-base/zimage-turbo-vs-base-rainy-crosswalk.jpg#wide)

Turbo nails the brief: the woman, the clear umbrella beaded with rain, warm reflections on wet pavement. Base produced a striking wet street with great reflections but **no woman with an umbrella in the foreground**, just a few distant figures, plus a garbled sign ("STUERONG"). **Winner: Turbo.**

### 4. Fixing a motorcycle in the garage

> *a man in his fifties fixing a vintage motorcycle in a cluttered home garage, harsh work light, tools and oil cans on the bench, grease on his hands, candid*

![Motorcycle garage: Z-Image Turbo left, Z-Image base right](/images/zimage-turbo-vs-base/zimage-turbo-vs-base-motorcycle-garage.jpg#wide)

Turbo goes close and detailed under a single lamp, with greasy hands and a polished, editorial feel, but the tank badge is garbled lettering ("FM3") and the bike's front end gets confusing. Base shows the whole cluttered garage, with shelves of oil cans, wrenches on the wall, a stained floor and flat overhead light. It looks like a real garage. **More real: base.**

### 5. Birthday candles with flash

> *harsh on-camera flash snapshot of a woman in her thirties blowing out candles on a birthday cake in a small apartment, friends leaning in, red eyes, cluttered table, unedited*

![Birthday flash: Z-Image Turbo left, Z-Image base right](/images/zimage-turbo-vs-base/zimage-turbo-vs-base-birthday-flash.jpg#wide)

Turbo delivers a convincing flash party photo: candlelight on her face, friends cut off at the edges, a cluttered table. Base took "red eyes" far too literally and gave her glowing red eyes and red-tinted lips, which turns a party snapshot into something out of a horror movie. **Winner: Turbo.**

## Speed (measured)

| Model | Steps | Seconds per image (832×1040, model loaded) |
|---|---|---|
| Z-Image Turbo | 8 | **~10 s** |
| Z-Image base | 25 | ~28 s |

Times are from ComfyUI's execution log on the RTX 5080. Both models (11.5 GB each, plus a 5.2 GB fp8 text encoder) ran on 16 GB of VRAM. I did not measure peak VRAM.

## Scorecard

| Test | More realistic | Followed the prompt better |
|---|---|---|
| Bread kitchen | Base | Tie |
| Ramen diner | Base | Tie |
| Rainy crosswalk | Tie | **Turbo** |
| Motorcycle garage | Base | Tie |
| Birthday flash | Turbo | **Turbo** |

## License

Both [Z-Image Turbo](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo) and [Z-Image base](https://huggingface.co/Tongyi-MAI/Z-Image) are released by Tongyi-MAI (Alibaba) under Apache 2.0, which allows commercial use.

## FAQ

**Is Z-Image base better than Turbo?** Not overall. Base looks more like ordinary, unstaged photos, but it's about 3x slower and less reliable at following the prompt. Turbo is better for fast, polished images.

**Does Z-Image base run on 16 GB of VRAM?** Yes. It ran on my 16 GB RTX 5080 at about 28 seconds per image.

**Which one should I train a LoRA on?** Base. LoRAs are generally trained on the base model.

**How does it compare to FLUX?** See my [Z-Image Turbo vs FLUX 3 klein test](/blog/z-image-turbo-vs-flux-3-klein). For believable everyday snapshots, FLUX 3 klein and Z-Image base are the two strongest options I've tested.

---

*Tested and written October 30, 2026.*
