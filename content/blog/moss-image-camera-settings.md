---
title: "Emulate a real camera in MOSS-Image: lens, focus and exposure"
seoTitle: "MOSS-Image Camera Settings: Emulate Lens, Focus, Bokeh and Exposure"
description: "A free ComfyUI workflow that emulates a real camera after the render: lens length, focus point, background blur, exposure and vignette, all from menus, without changing your picture."
date: "2026-11-06"
image: "/images/moss-camera/cover.jpg"
tags: ["AI images","ComfyUI"]
---

I keep coming back to [MOSS-Image](/blog/moss-image-film-camera-prompts), and I kept wanting the same thing from it: a photo that looks like someone chose how to shoot it. So I did what most people do and typed camera settings into the prompt. "85mm." "f/1.4." Not much happened. The closet behind my tailor stayed about as sharp as before.

Plain words like "heavy bokeh background" did better, but the harder I pushed them, the more they could change the man and the room. That felt backwards. On a real camera, the lens and aperture change how you capture a scene, not what's in it.

So I built a [free ComfyUI workflow](https://github.com/rgourley/moss-camera-settings) that works more like a camera. You render your image first, then pick the lens, aperture and exposure from menus and click where you want the focus. It stays the same picture, just shot differently.

You can try it on the four photos below. Each one starts as the untouched render, and each row of buttons changes one setting.

## The tailor

A long room behind him gives the blur plenty of distance to work with.

:::viewer
src: /data/moss-camera-tailor.json
:::

Focus works the same way: you click what you want sharp. This is the same render with two focus points.

:::viewer
src: /data/moss-camera-tailor-focus.json
:::

```text
an elderly tailor standing at a long cutting table in a narrow upstairs workshop, chalk in his hand, leaning over a length of dark wool and marking a line, placed on the left third of the frame, hard morning sun through a tall window on the right throwing the shadow of the window bars across the table, the cloth and his forearms, rolls of fabric and hanging half-made jackets soft in the shadow behind him, a pair of big steel shears and a tape measure out of focus in the near foreground, candid documentary photograph, ordinary real face with natural skin
```

Seed 2121.

## The goalkeeper

:::viewer
src: /data/moss-camera-goalkeeper.json
:::

```text
a young woman goalkeeper in a worn green jersey and muddy gloves standing beside the near goalpost on a wet grass soccer pitch, one hand resting on the white post, looking out across the field, placed on the left third of the frame, low late afternoon sun from the right throwing long shadows across the torn-up goalmouth and catching the water drops on the net, chalk lines scuffed into the mud at her feet, empty concrete stands and floodlight towers far behind her across the pitch, a muddy match ball out of focus in the near foreground
```

Seed 2121.

## The cook

He's sitting against a wall, so the wall stays fairly sharp whatever the aperture, just as it would with a real lens. The room through the door is further back, and that's what blurs.

:::viewer
src: /data/moss-camera-cook.json
:::

```text
a cook in his forties in a white t-shirt sitting on an upturned crate outside the back door of a small restaurant on his break, reading a folded newspaper, a blue painted door, stacked crates of oranges and a cat on the step, bright afternoon daylight on a warm terracotta wall, candid street photograph, seen from across the lane
```

Seed 2122.

## The musician

:::viewer
src: /data/moss-camera-musician.json
:::

```text
a double bass player in her forties in a bright patterned dress playing on a wide quiet cobbled street, standing with the bass upright in front of her and plenty of room around her, seen from the waist up, bow in her right hand, placed on the left third of the frame, calm neutral expression and eyes on the strings, her face clear and in soft daylight, a long street of old ochre buildings with green shutters falling away far into the distance behind her, soft late afternoon daylight, candid street photograph
```

Seed 2125.

## How it emulates a camera

| On a real camera | What it does | What the workflow does | Control |
|---|---|---|---|
| Focus point | Picks what's sharp | You click the spot on your image | Click |
| Aperture | Blurs by distance from the focus | Estimates depth, finds the subject's edge, then blurs by distance with a round lens-shaped blur | `aperture`, `foreground` |
| Lens length | Tighter view, more blur | Crops around your click and adds blur as the lens gets longer | `lens` |
| Exposure | Sets how much light you get | Scales the light in stops | `exposure` |
| Lens falloff | Darkens the corners | Adds a round vignette | `vignette` |
| Light falling off | Darker further from the light | Darkens the background by distance | `background_light` |

It's an emulation, not a simulation. Real perspective comes from where the camera stands, so the lens menu can't change that, and it can't go wider than your render. Cropping also uses up pixels, so if you plan to go tight, write your subject large in the frame.

## Why not just use the prompt?

You can try, but MOSS doesn't really respond to camera numbers. In my tests "f/1.4" left the background as sharp as before, and "ISO 3200" did nothing. Plain words work better: "heavy bokeh background" was the strongest wording I found without naming objects. But stronger wording can also start changing the person and the room. Doing it after the render avoids that.

## How to use it

1. Write your prompt and press **Run**. It stops after the first render, with your image in the Camera Settings node.
2. **Click what you want in focus.** A box shows what the lens will keep.
3. Pick your menus and press **Run** again. The render is reused, so trying another look only takes seconds.

**Good to know:** thin things like nets can confuse the depth estimate. With the foreground blurred, open ground can show a sharp strip with blurred bands in front and behind. Face detail is off by default, because it can damage small faces. All four photos use MOSS-Image at 25 steps, CFG 2.5, `er_sde`, 1216×832.

## Get it

The [workflow and nodes are free on GitHub](https://github.com/rgourley/moss-camera-settings). They need ComfyUI and the MOSS-Image files, and the first run downloads two small models, about 280 MB in total, that run on your CPU.

For the look of the picture as well as the camera, try my [film stock and camera prompts for MOSS-Image](/blog/moss-image-film-camera-prompts).
