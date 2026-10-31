---
title: "Is Z-Image Turbo Better Than FLUX 3 klein? 5 Real Tests on 16 GB VRAM"
seoTitle: "Is Z-Image Turbo Better Than FLUX 3 klein?"
description: "Same prompts, same seeds, run locally in ComfyUI. Z-Image Turbo wins polished portraits and speed. FLUX 3 klein wins believable amateur snapshots."
date: "2026-10-30"
image: "/images/zimage-vs-flux/zimage-vs-flux-cover.jpg"
tags: ["AI images","ComfyUI"]
---

I've been setting up a local machine to make images, and I needed to pick a default model. Most comparisons I found showed the best image out of many tries, which tells you very little about what you'll get on a normal day. So I ran my own, first try only.

Z-Image Turbo makes an image in about 9 seconds on my 16 GB RTX 5080. FLUX 3 klein takes about 26. I ran both on the same five prompts with the same seeds to see what the extra time buys.

Z-Image makes cleaner, more polished people. FLUX makes photos that look more like someone's real, unflattering phone snapshot, but it breaks more often on hands and crowds. I'd keep Z-Image as my default for the speed alone, and switch to FLUX when a picture needs to look like nobody planned it.

![Z-Image Turbo (top row) vs FLUX 3 klein (bottom row), five prompts, same seeds](/images/zimage-vs-flux/zimage-vs-flux-overview.jpg#wide)

## How I tested

Both models ran in ComfyUI at their recommended settings, with no LoRAs and no negative prompt. Z-Image Turbo used 8 steps, CFG 1, `res_multistep` and shift 3. FLUX 3 klein base used 30 steps, CFG 3.5 and `euler`. Every image is 832×1040 and a one-shot: first seed only, no re-rolls, no cherry-picking and no fixes afterward.

## Cafe portrait

> *professional lifestyle photograph of a woman in her early thirties with auburn shoulder-length hair and light freckles, laughing at a cafe table with a latte and a croissant, oversized cream hoodie, soft natural window light, sharp focus*

![Cafe portrait: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux/zimage-vs-flux-cafe-portrait.jpg#wide)

Both are good. Z-Image is crisper, with sharper freckles and brighter light. FLUX is warmer and softer, but her eyes are slightly off, with an uneven squint, and the hoodie is so smooth it looks styled. Z-Image's face holds up better.

## Kitchen snapshot

> *amateur phone photo, a woman in her thirties with messy hair in a grey t-shirt making toast at a cluttered kitchen counter in the morning, taken with an old iPhone, flat indoor light, slightly off-center, a little motion blur, dirty dishes and cereal box in the background, unedited*

![Kitchen snapshot: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux/zimage-vs-flux-kitchen-snapshot.jpg#wide)

Z-Image still made a tidy, bright kitchen. It looks like a magazine's idea of a messy morning, and the cereal box text is garbled. FLUX made a cluttered counter, an awkward pose and flat light, which is much closer to a real photo. But her forearm bends oddly over the toast and the other hand has melted into a blur with a knife in it. FLUX has the better mood here, but I'd run a few seeds before trusting its hands.

## Backyard barbecue with flash

> *candid phone photo at night with harsh direct flash, three friends laughing at a backyard barbecue holding paper plates, red eyes, dark background, slightly overexposed faces, unedited snapshot*

![Barbecue night flash: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux/zimage-vs-flux-bbq-night-flash.jpg#wide)

Z-Image gets the flash and the black background, but the three friends are neatly arranged around a centered grill. FLUX is crowded and blown out, which is how a real party photo looks. It's also where FLUX breaks: the bearded man's arm goes straight through the woman in front of him, and the pile of people on the right is hard to untangle. FLUX has the better look and Z-Image has the cleaner bodies.

## Man and dog in a parking lot

> *phone snapshot of a middle-aged man in a rain jacket with his golden retriever in a supermarket parking lot on an overcast day, off-center framing, slightly crooked horizon, ordinary and unposed*

![Parking lot snapshot: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux/zimage-vs-flux-parking-lot-dog.jpg#wide)

Z-Image took "phone snapshot" literally and drew a hand holding a phone, with the scene on its screen. FLUX made a believable candid selfie with the dog wandering past. FLUX wins this one easily.

## Fisherman close-up

> *close-up portrait of a 70 year old fisherman with a weathered face and grey stubble on a harbor dock, overcast daylight, natural skin texture, 85mm photo*

![Fisherman close-up: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux/zimage-vs-flux-fisherman-closeup.jpg#wide)

Both are excellent. Z-Image's pores and wrinkles are extremely sharp, almost too much up close. FLUX is a little more stylized, with a nice scarf and more of the harbor. Slight edge to Z-Image.

## Speed

Z-Image Turbo took about 9 to 10 seconds per image and FLUX 3 klein about 26, with each model already loaded. That's from ComfyUI's own log. Z-Image is 11.5 GB plus a 5.2 GB text encoder, and FLUX klein base is 10.3 GB plus an 8.3 GB text encoder. Both ran fine on 16 GB.

## Licenses

[Z-Image Turbo](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo) is Apache 2.0, so commercial use is allowed. FLUX 3 klein uses the [FLUX Kommunity License v1.0](https://huggingface.co/black-forest-labs/flux-3-image-klein-base). Per the model card, non-commercial use is free, commercial image generation is allowed under US$5M in annual revenue, and anything else needs a [separate license](https://bfl.ai/licensing). Read it yourself before using it commercially.

## What I'd do differently

Don't write "phone photo" or "phone snapshot" in a Z-Image prompt, because it may draw the phone. Describe what the photo looks like instead: harsh on-camera flash, slight motion blur, crooked framing, a cluttered background.

Z-Image leans polished even when you ask for amateur. The non-Turbo Z-Image base accepts a negative prompt, so I tested that next in [Z-Image Turbo vs Base](/blog/z-image-turbo-vs-z-image-base).

FLUX 3 klein follows "amateur" wording well. The plainness that hurts it on glamour shots is exactly what makes its kitchen look like someone's actual kitchen.

*Tested on an RTX 5080 with 16 GB of VRAM.*
