---
title: "The best Z-Image Turbo settings, tested: steps, CFG, sampler and more"
seoTitle: "Best Z-Image Turbo Settings: Sampler, Steps and CFG Tested"
description: "Z-Image Turbo settings tested one at a time: steps, sampler, scheduler, CFG, shift and resolution. 76 images, a compare tool, and the karras myth."
date: "2026-10-31"
image: "/images/zimage-settings/steps-16-2121.jpg"
tags: ["AI images","ComfyUI"]
---

One dropdown in ComfyUI can wreck a Z-Image photo. Switch the scheduler from simple to karras. A sharp portrait of a Roman officer turns into soft orange mush, even the ring on his hand. Nothing else changed, not even the 6 seconds it took to generate.

That was the biggest surprise in 76 tests. I used one prompt for all of them: a Roman officer at a table at night. I ran it on two seeds and changed one setting at a time. Everything else stayed at the default, which is 8 steps, CFG 1 and shift 3 at 1344×768. The sampler was res_multistep with the simple scheduler, on a 16 GB card.

The sampler and shift barely changed anything. The scheduler and CFG can break it. The advice I kept finding online was DPM++ 2M Karras at 25 steps, and that made the picture rougher and two and a half times slower.

I'd keep 8 steps and CFG 1. Pick euler or res_multistep, with the simple or beta scheduler. Go up to 16 steps if you want a bit of film grain. Choose a setting below and drag across the image to compare it with the default. The zoom button jumps to the hands and the ring, which is where bad settings show first.

:::settings
src: /data/zimage-settings.json
:::

Every image below uses this prompt, with only the setting changed:

```text
medium close-up of a Roman legionary officer in his thirties with short messy brown hair sitting at a table at night, eyes lowered, lost in thought, his hands clasped in front of his chin, a worn gold signet ring on one finger, fingerless leather gloves, a dark red wool cloak over Roman leather armor with ornate embossed bronze vambraces and a round bronze brooch pinning the cloak at the shoulder, warm low amber light falling across his face and hands from the left, the right side of his face in deep shadow, the background a deep out-of-focus blur of dark shapes and soft warm shapes, the dark out-of-focus shoulder of someone in the foreground framing the bottom and edges of the shot, shallow depth of field, 50mm anamorphic lens, 35mm motion picture film, fine grain
```

## How many steps?

Z-Image Turbo is trained to finish in 8 steps, and 8 is where it looks best. At 4 the skin goes waxy. Up to 12 it barely changes. At 16 it's still good and picks up some film grain, which I liked. At 25 it starts to look hyper-real. The skin gets blotchy, and on seed 2121 he grows a second ring.

On a model this fast, extra steps mostly buy you time on the clock. Past 16 they start to hurt.

![4 steps, seed 2121, 3.2s](/images/zimage-settings/steps-4-2121.jpg#grid) ![4 steps, seed 3434, 3.2s](/images/zimage-settings/steps-4-3434.jpg#grid)

![6 steps, seed 2121, 4.2s](/images/zimage-settings/steps-6-2121.jpg#grid) ![6 steps, seed 3434, 4.2s](/images/zimage-settings/steps-6-3434.jpg#grid)

![8 steps, seed 2121, 5.7s](/images/zimage-settings/steps-8-2121.jpg#grid) ![8 steps, seed 3434, 5.7s](/images/zimage-settings/steps-8-3434.jpg#grid)

![10 steps, seed 2121, 7.1s](/images/zimage-settings/steps-10-2121.jpg#grid) ![10 steps, seed 3434, 7.1s](/images/zimage-settings/steps-10-3434.jpg#grid)

![12 steps, seed 2121, 8.1s](/images/zimage-settings/steps-12-2121.jpg#grid) ![12 steps, seed 3434, 8.1s](/images/zimage-settings/steps-12-3434.jpg#grid)

![16 steps, seed 2121, 10.3s](/images/zimage-settings/steps-16-2121.jpg#grid) ![16 steps, seed 3434, 10.3s](/images/zimage-settings/steps-16-3434.jpg#grid)

![25 steps, seed 2121, 15.4s](/images/zimage-settings/steps-25-2121.jpg#grid) ![25 steps, seed 3434, 15.4s](/images/zimage-settings/steps-25-3434.jpg#grid)

## Which sampler?

Euler, res_multistep and dpmpp_2m make almost the same picture. Pick any of them. Some samplers add noise every step, like dpmpp_sde, er_sde and euler_ancestral. They change the face and the pose. You get a new picture with no gain in quality. On er_sde the ring nearly vanishes. LCM comes out soft and flat.

![euler, seed 2121, 6.0s](/images/zimage-settings/sampler-euler-2121.jpg#grid) ![euler, seed 3434, 6.0s](/images/zimage-settings/sampler-euler-3434.jpg#grid)

![res_multistep, seed 2121, 6.0s](/images/zimage-settings/sampler-res_multistep-2121.jpg#grid) ![res_multistep, seed 3434, 6.0s](/images/zimage-settings/sampler-res_multistep-3434.jpg#grid)

![dpmpp_2m, seed 2121, 6.0s](/images/zimage-settings/sampler-dpmpp_2m-2121.jpg#grid) ![dpmpp_2m, seed 3434, 6.0s](/images/zimage-settings/sampler-dpmpp_2m-3434.jpg#grid)

![dpmpp_sde, seed 2121, 11.6s](/images/zimage-settings/sampler-dpmpp_sde-2121.jpg#grid) ![dpmpp_sde, seed 3434, 11.6s](/images/zimage-settings/sampler-dpmpp_sde-3434.jpg#grid)

![uni_pc, seed 2121, 6.6s](/images/zimage-settings/sampler-uni_pc-2121.jpg#grid) ![uni_pc, seed 3434, 6.6s](/images/zimage-settings/sampler-uni_pc-3434.jpg#grid)

![er_sde, seed 2121, 6.0s](/images/zimage-settings/sampler-er_sde-2121.jpg#grid) ![er_sde, seed 3434, 6.0s](/images/zimage-settings/sampler-er_sde-3434.jpg#grid)

![euler_ancestral, seed 2121, 5.7s](/images/zimage-settings/sampler-euler_ancestral-2121.jpg#grid) ![euler_ancestral, seed 3434, 5.7s](/images/zimage-settings/sampler-euler_ancestral-3434.jpg#grid)

![lcm, seed 2121, 6.0s](/images/zimage-settings/sampler-lcm-2121.jpg#grid) ![lcm, seed 3434, 6.0s](/images/zimage-settings/sampler-lcm-3434.jpg#grid)

## Which scheduler?

I ran these on euler at 8 steps. Karras and exponential break the image. Karras turns everything soft and orange, and exponential adds a screen-door pattern on top of the blur. Beta is the only one that beat simple, with a little more texture in the leather and the bronze.

At 8 steps, karras falls apart. The 25 steps in the popular advice hold it together, at two and a half times the cost.

![simple, seed 2121, 5.5s](/images/zimage-settings/scheduler-simple-2121.jpg#grid) ![simple, seed 3434, 5.5s](/images/zimage-settings/scheduler-simple-3434.jpg#grid)

![beta, seed 2121, 5.7s](/images/zimage-settings/scheduler-beta-2121.jpg#grid) ![beta, seed 3434, 5.7s](/images/zimage-settings/scheduler-beta-3434.jpg#grid)

![sgm_uniform, seed 2121, 5.6s](/images/zimage-settings/scheduler-sgm_uniform-2121.jpg#grid) ![sgm_uniform, seed 3434, 5.6s](/images/zimage-settings/scheduler-sgm_uniform-3434.jpg#grid)

![karras, seed 2121, 5.2s](/images/zimage-settings/scheduler-karras-2121.jpg#grid) ![karras, seed 3434, 5.2s](/images/zimage-settings/scheduler-karras-3434.jpg#grid)

![normal, seed 2121, 6.1s](/images/zimage-settings/scheduler-normal-2121.jpg#grid) ![normal, seed 3434, 6.1s](/images/zimage-settings/scheduler-normal-3434.jpg#grid)

![exponential, seed 2121, 5.2s](/images/zimage-settings/scheduler-exponential-2121.jpg#grid) ![exponential, seed 3434, 5.2s](/images/zimage-settings/scheduler-exponential-3434.jpg#grid)

## What CFG?

At CFG 1 the negative prompt is ignored, which is how Turbo is meant to run. At 1.5 the contrast goes up and the bronze pops. At 2 it's a little warm and washed out but usable. At 3 it burns, and at 4 seed 3434 turns into black bars and smeared red. Anything above 1 also doubles the time per image, because the model runs twice.

![CFG 1, seed 2121, 5.6s](/images/zimage-settings/cfg-1-2121.jpg#grid) ![CFG 1, seed 3434, 5.6s](/images/zimage-settings/cfg-1-3434.jpg#grid)

![CFG 1.5, seed 2121, 10.2s](/images/zimage-settings/cfg-1.5-2121.jpg#grid) ![CFG 1.5, seed 3434, 10.2s](/images/zimage-settings/cfg-1.5-3434.jpg#grid)

![CFG 2, seed 2121, 10.1s](/images/zimage-settings/cfg-2-2121.jpg#grid) ![CFG 2, seed 3434, 10.1s](/images/zimage-settings/cfg-2-3434.jpg#grid)

![CFG 3, seed 2121, 10.4s](/images/zimage-settings/cfg-3-2121.jpg#grid) ![CFG 3, seed 3434, 10.4s](/images/zimage-settings/cfg-3-3434.jpg#grid)

![CFG 4, seed 2121, 10.8s](/images/zimage-settings/cfg-4-2121.jpg#grid) ![CFG 4, seed 3434, 10.8s](/images/zimage-settings/cfg-4-3434.jpg#grid)

## Shift

Shift changes how the model splits its steps between rough shapes and fine detail. At 1 the skin gets gritty and heavily textured, which could suit a rougher look. From 3 up it smooths out. Seed 3434 hardly moved.

![Shift 1, seed 2121, 6.0s](/images/zimage-settings/shift-1-2121.jpg#grid) ![Shift 1, seed 3434, 6.0s](/images/zimage-settings/shift-1-3434.jpg#grid)

![Shift 2, seed 2121, 6.0s](/images/zimage-settings/shift-2-2121.jpg#grid) ![Shift 2, seed 3434, 6.0s](/images/zimage-settings/shift-2-3434.jpg#grid)

![Shift 3, seed 2121, 6.1s](/images/zimage-settings/shift-3-2121.jpg#grid) ![Shift 3, seed 3434, 6.1s](/images/zimage-settings/shift-3-3434.jpg#grid)

![Shift 5, seed 2121, 6.0s](/images/zimage-settings/shift-5-2121.jpg#grid) ![Shift 5, seed 3434, 6.0s](/images/zimage-settings/shift-5-3434.jpg#grid)

![Shift 7, seed 2121, 6.1s](/images/zimage-settings/shift-7-2121.jpg#grid) ![Shift 7, seed 3434, 6.1s](/images/zimage-settings/shift-7-3434.jpg#grid)

## Resolution

I kept all of these at 16:9 so only the size changes. Bigger gets more detail. At 2560×1440 you can count the rivets on the bracers. But the light goes flatter and the framing moves. Each image also takes 24 seconds instead of 6. For a dark, moody shot I'd stay near 1344 and push the steps toward 16 before going bigger.

![1024×576, seed 2121, 4.2s](/images/zimage-settings/res-1024x576-2121.jpg#grid) ![1024×576, seed 3434, 4.2s](/images/zimage-settings/res-1024x576-3434.jpg#grid)

![1344×768, seed 2121, 6.0s](/images/zimage-settings/res-1344x768-2121.jpg#grid) ![1344×768, seed 3434, 6.0s](/images/zimage-settings/res-1344x768-3434.jpg#grid)

![1600×896, seed 2121, 8.1s](/images/zimage-settings/res-1600x896-2121.jpg#grid) ![1600×896, seed 3434, 8.1s](/images/zimage-settings/res-1600x896-3434.jpg#grid)

![1920×1088, seed 2121, 12.2s](/images/zimage-settings/res-1920x1088-2121.jpg#grid) ![1920×1088, seed 3434, 12.2s](/images/zimage-settings/res-1920x1088-3434.jpg#grid)

![2048×1152, seed 2121, 14.2s](/images/zimage-settings/res-2048x1152-2121.jpg#grid) ![2048×1152, seed 3434, 14.2s](/images/zimage-settings/res-2048x1152-3434.jpg#grid)

![2560×1440, seed 2121, 24.8s](/images/zimage-settings/res-2560x1440-2121.jpg#grid) ![2560×1440, seed 3434, 24.8s](/images/zimage-settings/res-2560x1440-3434.jpg#grid)

## The DPM++ 2M Karras myth

Here it is at 25 steps, the way the advice says to run it. The picture holds together. The skin is rougher than the default, and each image takes two and a half times as long.

![DPM++ 2M Karras, 25 steps, seed 2121, 15.3s](/images/zimage-settings/myth-dpmpp_2m-karras-25-2121.jpg#grid) ![DPM++ 2M Karras, 25 steps, seed 3434, 15.3s](/images/zimage-settings/myth-dpmpp_2m-karras-25-3434.jpg#grid)

No setting fixed the brooch. I asked for one pinning the cloak at the shoulder. In almost every image the cloak just drapes over the armor, and the round bronze pieces sit on the armor itself. Z-Image does that on every setting I tried.

If you run ComfyUI, the [free workflow from the movie stills post](/downloads/z-image-turbo-movie-stills-8-looks.json) already uses 8 steps, CFG 1 and the simple scheduler. Try beta.
