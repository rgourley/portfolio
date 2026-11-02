---
title: "Which Z-Image Turbo model file should you download? BF16, FP8, int8 and NVFP4 tested"
seoTitle: "Z-Image Turbo BF16 vs FP8 vs int8 vs NVFP4: Which File?"
description: "Four Z-Image Turbo model files, same prompts and seeds on an RTX 5080. int8 matched BF16 at half the size and twice the speed. NVFP4 drifted most."
date: "2026-11-01"
image: "/images/zimage-files/files-hero-portrait.jpg"
tags: ["AI images","ComfyUI"]
---

The 6.2 GB int8 file of Z-Image Turbo drew almost the same pictures as the 12.3 GB original, down to the scratches on a payphone, in about half the time. I didn't expect that. Smaller files usually cost you something, and I went in assuming FP8 would be the safe middle pick.

Z-Image Turbo comes as several model files that hold the same model at different precision. BF16 is the full version. FP8, int8 and NVFP4 store each number with fewer bits, so the file is smaller and can run faster, and the picture can drift. I ran the same two prompts on the same four seeds through each file to see how far each one moves away from BF16, and how much time it saves.

| File | Size | Time per image | Matches BF16? |
|---|---|---|---|
| [BF16](https://huggingface.co/Comfy-Org/z_image_turbo/blob/main/split_files/diffusion_models/z_image_turbo_bf16.safetensors) | 12.3 GB | 9–12s | It is the reference |
| [int8](https://huggingface.co/Comfy-Org/z_image_turbo/blob/main/split_files/diffusion_models/z_image_turbo_int8_convrot.safetensors) | 6.2 GB | 4–5s | Closest of the three |
| [FP8](https://huggingface.co/Kijai/Z-Image_comfy_fp8_scaled/blob/main/z-image-turbo_fp8_scaled_e4m3fn_KJ.safetensors) | 6.2 GB | 8–9s | Close, small parts change |
| [NVFP4](https://huggingface.co/Comfy-Org/z_image_turbo/blob/main/split_files/diffusion_models/z_image_turbo_nvfp4.safetensors) | 4.5 GB | 4s | Same scene, different details |

All four ran in ComfyUI on an RTX 5080 with 16 GB, at 8 steps, CFG 1 and shift 3, the defaults from [the Z-Image settings post](/blog/z-image-turbo-best-settings). Each time is the median of three images, leaving out the first one, which includes loading the model.

## How I tested the files

A model file's precision shows up in small, hard details first: lettering, buttons, jewelry, the shape of a machine. A face in soft light hides it. So I wrote two prompts full of small parts, both lit with hard low sun, which is the light I trust most in Z-Image. The [lighting prompts post](/blog/z-image-turbo-lighting-prompts) explains why.

The first is a magazine portrait: a woman in a camel coat leaning on an old green car by a brick wall, with gold hoops, a silver ring and her head's shadow on the bricks.

```text
Waist-up fashion editorial portrait from slightly below, a tall woman in her late twenties with deep brown skin, high cheekbones and short cropped natural hair, leaning back against the roof of a dusty dark green vintage sedan beside a weathered red brick wall, her forearm resting on the chrome edge of the roof, the car's curved roofline and rain gutter running across the bottom of the frame, wearing an oversized camel wool coat over a cream ribbed turtleneck, chin lifted, looking past the camera, her face in the upper third of the frame, slightly left of center. Hard low golden sun from the right in late afternoon rakes across her face and the brick, throwing the crisp shadow of her head onto the wall, the far side of her face falling into deep shadow. Small gold hoop earrings, a chunky silver ring, the coarse weave of the wool, dust and fine scratches on the dark paint, chipped mortar between the bricks, visible pores, fine baby hairs at her hairline, a natural sheen on her cheekbone. 85mm lens, editorial photograph from a fashion magazine, the subject razor sharp and the far end of the street dissolved into soft out-of-focus shapes, rich natural color with deep shadows, soft rolled-off highlights, medium format film, fine grain
```

The second is a film still of a woman on an old payphone against a turquoise brick wall. The payphone is there for its keypad: twelve small buttons are a hard test for any file.

```text
Medium close-up at eye level, a woman in her late twenties with warm olive skin, freckles, and thick dark brown hair pulled back in a loose low bun with a few strands falling by her ear, standing at an old brushed steel payphone mounted on a brick wall painted chipped turquoise, the paint flaking to show red brick underneath, the payphone a plain upright box with a square twelve-button keypad in four rows of three, a narrow coin slot at the top right and a small coin return flap at the bottom, holding the cream handset to her ear with one hand, the coiled cord hanging down, glancing sideways out of frame with her lips slightly parted as if she just heard something. She is placed left of center, the payphone on the right. She wears a mustard yellow corduroy jacket over a black ribbed top and small gold earrings. Hard low late-afternoon sun from the left rakes across the wall and her face, the near side of her face warm and bright, the far side in soft shadow, a crisp cast shadow of her head, the handset and the coiled cord falling across the turquoise bricks behind her, every chip of paint and brick edge picking up the light. Worn square metal keypad buttons with a slight shine, fine baby hairs lit at her hairline, visible pores. 50mm anamorphic lens, film still from a feature film, the subject razor sharp, soft rolled-off highlights with a faint halation glow, rich color grade with teal and warm amber, deep shadows, 35mm motion picture film, fine grain
```

The payphone took three tries to be a fair test. My first prompt just said "an old payphone," so each file was free to design a different phone, and I couldn't tell drift from a new design. Then I spelled out the keypad and added "no dial." Z-Image read that as a request and put a rotary dial on three of the four BF16 images. Naming a thing you don't want draws it. The prompt above describes only what the phone has.

## The magazine portrait, file by file

BF16 is always on the left. Pick a file for the right side, step through the seeds, and switch to Face to zoom in on the same spot in both.

:::combo
src: /data/zimage-files-editorial.json
:::

On this prompt all four files hold up. The pose, coat, car and shadow on the wall stay put. int8 is hard to tell from BF16 even zoomed in. FP8 is close too. NVFP4 moves things slightly: the tilt of her head, the crop, the shape of the rings. On its own you'd never know.

## The payphone, file by file

:::combo
src: /data/zimage-files-payphone.json
:::

This is where the files split apart. On seeds 2121, 5656 and 7878, int8 draws BF16's phone: the same display, the same handle, the same scratches and close to the same digits on the keys. On 3434 it keeps the phone's shape but changes the buttons. FP8 keeps the shape of each phone and changes more inside it. It adds a row of buttons on 2121 and 3434, and on 5656 it swaps the handle under the display for a different part.

Counting is hard for Z-Image even at full precision. I asked for four rows of three buttons, and BF16 drew anywhere from three to five rows. That's why every file is judged against BF16's drawing, not against the prompt.

NVFP4 draws a different phone on every seed. On seed 3434 it put a rotary dial above the keypad, though the prompt only describes a keypad, and the framing shifts a little wider on most seeds. The phones still look like real, well-made phones. They're just not the phone BF16 drew.

## Does a smaller file make skin worse?

Not in this test. Zoomed into her face, the freckles, pores and fine hair hold up on all four files. NVFP4 changes a few strands of hair and the set of the mouth, which is drift, not lost detail. Click any close-up to open it large and switch to the full frame.

:::crops
src: /data/zimage-files-crops.json
:::

If skin is what you care about most, the [realistic skin post](/blog/z-image-turbo-realistic-skin) matters more than the file you pick. Dropping shift from 3 to 2 did more for pores than any file here.

## Is FP8 faster than BF16?

Not on my card. Kijai's FP8 file was 8 to 9 seconds an image, the same as BF16. It halves the download and the space on disk, and it looks nearly identical, but on an RTX 5080 int8 gave me the same size, twice the speed and a closer match. I didn't test FP8 on an older card, where the result could differ.

## Which Z-Image Turbo file should you use?

On an RTX 5080, int8. It's half the size of BF16, runs in about 4 to 5 seconds instead of 9 to 12, and drew the closest picture to BF16 of the three smaller files. Keep BF16 if you need to match images someone else made with it, seed for seed.

NVFP4 is the fastest, at 4 seconds and 4.5 GB, and its pictures are good. Use it when speed matters more than matching BF16. NVFP4 is a format made for RTX 50-series cards, so test it before relying on it on anything older.

Memory didn't help me choose. ComfyUI filled about 15.3 GB of my card's 16 GB with every file, because it caches whatever fits, so the peak readings were the same for all four. On a smaller card, file size is the number to watch. I haven't tested GGUF files yet, which go smaller still and need an extra ComfyUI node.

The surprise was the order. I'd have bet on FP8 as the faithful copy, and int8 beat it on both speed and detail.
