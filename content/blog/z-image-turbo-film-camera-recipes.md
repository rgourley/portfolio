---
title: "42 film and camera prompts for Z-Image"
seoTitle: "Z-Image Turbo Film Prompts: 42 Film Stock and Camera Looks Tested"
description: "Portra, CineStill, Tri-X, Polaroid, Holga, tintype and more: 42 film and camera prompts for Z-Image Turbo, each shown on a portrait, a night street and a boat. Plus what didn't work."
date: "2026-11-03"
image: "/images/film-sim/r3/film-sim-hero.jpg"
tags: ["AI images","ComfyUI"]
---

In my [last film test](/blog/film-camera-prompts-z-image-vs-krea-2), film names like Portra and Tri-X changed Z-Image's pictures, but camera names mostly didn't, and Z-Image kept printing "Kodak" on cups and signs. This time I wanted a set of film looks you can copy and use.

I tried 68 film stocks, cameras, color looks and kinds of broken film, each on the same three photos. 42 of them changed the picture in a way you can see. Each one is below with the exact words I used and its result on all three photos.

:::jump
# Film stocks
Kodak Portra 400
Kodak Portra 800
Kodak Ektar 100
Kodak Gold 200
Fuji Superia 400
Fuji Pro 400H
CineStill 800T
Kodachrome 64
Fuji Velvia 50
Cross-processed slide
Kodak Tri-X 400
Ilford HP5 pushed to 3200
Kodak T-Max 100
Polaroid SX-70
Expired Polaroid
Instax Mini
Super 8
# Cameras
Disposable
Holga
Diana
Fisheye toy camera
Sprocket Rocket
Half-frame diptych
Kodak Brownie box camera
Kodak Instamatic 110
2000s digicam
Fujifilm Classic Chrome
Glass plate
Tintype / wet plate
Daguerreotype
# General looks
Warm golden
Faded 1970s print
Faded 1990s snapshot
Matte faded film
Cool muted
Teal and orange
Bleach bypass
Sepia
Warm vintage filter
Pastel dream
Moody dark
Golden hour glow
:::

## The short version

- **Put the film look first.** Z-Image follows the start of a prompt more closely than the end. With the film words after a long scene, most looks barely changed anything.
- **Describe what the film does, not its name.** "Warm skin tones, soft contrast, fine grain in the shadows" works. Brand names make Z-Image print the brand onto signs, cups and shirts.
- **Describe the color, not the kind of photo.** Words like "cheap snapshot" or "drugstore print" change the whole picture: framing, light and pose. If you only want the color, only describe the color.
- **Describe what you'd see, not the lens.** "Heavy black vignette, cyan shadows, a red light leak" works for a Holga. Talk about focal length or sharpness changes nothing, because Z-Image already makes sharp, clean photos.
- **Don't name a device.** Ask for a "smartphone photo" or a "camera" and Z-Image may put one in the picture.

All 42 looks are also in the [Film Looks pack](https://rgourley.gumroad.com/l/film-looks-z-image-moss) as a ComfyUI dropdown, if you'd rather not copy them by hand.

## How I tested

Everything ran on Z-Image Turbo in ComfyUI on an RTX 5080: 16 steps, CFG 1, `res_multistep`, shift 3, 1216×832, no LoRAs. I used 16 steps instead of the usual 8 because my [settings test](/blog/z-image-turbo-best-settings) found it adds a little film texture. The seed is the same for every image and there are no re-rolls, so each image is a one-shot.

Each prompt is the recipe sentence followed by the scene. For example, the Portra 400 portrait was:

> *35mm color negative film photo, warm natural skin tones, soft contrast, soft highlight rolloff, gentle pastel colors, organic fine grain in the shadows.* A waist-up portrait of a striking woman in her mid twenties, oval face, high cheekbones, straight dark eyebrows, hazel eyes, a small mole above the left corner of her lip, ...

The three scenes are a portrait against a sunlit wall (skin, hard shadow and warm light), a rainy street at night (lights, reflections, color), and an old rowboat on a mountain lake (fine detail and strong color). The scene words never change, but the picture can still shift: with a different start to the prompt, Z-Image redraws whatever the scene leaves open. My first portrait, a woman in a field at sunset, changed her pose and even her face from look to look. Describing this one in much more detail (her face, a mole, her hair, the pose, the shutter and the geraniums) kept her nearly the same in every recipe. I kept every result as it came out.

These are the plain images, with no film look:

:::photos
base: /images/film-sim/r3/plain
alt: No film look
:::

Every recipe below opens on the portrait. Use the tabs above each photo to see the street and the boat, and click a photo to see it larger.

## Film stocks

17 of the 20 film stocks I tried are here. Some differences are subtle, and a few stocks look alike on these scenes.

**Color negative**

### Kodak Portra 400

```
35mm color negative film photo, warm natural skin tones, soft contrast, soft highlight rolloff, gentle pastel colors, organic fine grain in the shadows.
```

:::photos
base: /images/film-sim/r3/film-kodak_portra_400
alt: Kodak Portra 400
:::

Softer, paler color than the plain image. The safest film look if you just want it to feel less digital.

### Kodak Portra 800

```
Fast 35mm color negative film photo, warm skin tones, soft contrast, visible grain in the shadows.
```

:::photos
base: /images/film-sim/r3/film-kodak_portra_800
alt: Kodak Portra 800
:::

Close to Portra 400 on these scenes.

### Kodak Ektar 100

```
35mm color negative film photo, very saturated punchy colors, vivid reds and blues, crisp detail, very fine grain.
```

:::photos
base: /images/film-sim/r3/film-kodak_ektar_100
alt: Kodak Ektar 100
:::

Punchier reds. The boat's paint gets brighter.

### Kodak Gold 200

```
Warm yellow-gold color cast, slightly muddy shadows, moderate film grain.
```

:::photos
base: /images/film-sim/r3/film-kodak_gold_200
alt: Kodak Gold 200
:::

A strong warm-yellow cast, most obvious on the night street. My first wording called it a "cheap consumer" photo with "1990s drugstore print colors." Z-Image read that as a kind of snapshot and redrew the scenes, with new framing and flatter light, while the color barely changed. Describing only the color fixed it.

### Fuji Superia 400

```
Consumer 35mm film photo, slight green cast in the shadows, cool tones, punchy greens, moderate grain.
```

:::photos
base: /images/film-sim/r3/film-fuji_superia_400
alt: Fuji Superia 400
:::

Cooler, with greener shadows.

### Fuji Pro 400H

```
35mm film photo, airy pastel colors, minty greens, cool soft highlights, low contrast, fine grain.
```

:::photos
base: /images/film-sim/r3/film-fuji_pro_400h
alt: Fuji Pro 400H
:::

Paler and cooler, close to pastel.

### CineStill 800T

```
Tungsten-balanced night film photo, cool blue-teal shadows, soft red halation bloom around every light, organic film grain.
```

:::photos
base: /images/film-sim/r3/film-cinestill_800t
alt: CineStill 800T
:::

Teal shadows and a cooler night. It didn't add the red glow around lights that the real film is known for.

**Slide film**

### Kodachrome 64

```
1960s color slide film photo, rich deep reds, dense dark blues, strong contrast, slightly warm, very fine grain.
```

:::photos
base: /images/film-sim/r3/film-kodachrome_64
alt: Kodachrome 64
:::

Deep blue sky and dense reds.

### Fuji Velvia 50

```
Color slide film photo, ultra-saturated color, deep rich reds and warm yellows, lush cool greens and deep blues, ruddy pink skin, high contrast, shadows dropping quickly to pure black, razor-sharp detail, almost no grain.
```

:::photos
base: /images/film-sim/r3/film-fuji_velvia_50-v2
alt: Fuji Velvia 50
:::

Strong color and hard contrast: deep reds, cool greens and blacks that drop away fast. My first wording missed this, and someone who has shot Velvia corrected me on its greens and blacks. Real Velvia is rarely used for portraits because it turns skin ruddy, and you can see that here.

### Cross-processed slide

```
Cross-processed film photo, harsh contrast, yellow-green highlights, cyan shadows, blown out skin tones, strange color shifts.
```

:::photos
base: /images/film-sim/r3/film-cross_processed_slide
alt: Cross-processed slide
:::

**Black and white**

### Kodak Tri-X 400

```
Black and white 35mm film photo, gritty visible grain, high contrast, deep blacks, documentary feel.
```

:::photos
base: /images/film-sim/r3/film-kodak_tri_x_400
alt: Kodak Tri-X 400
:::

Black and white, except Z-Image left the yellow raincoat and the red paint in color. More on that below.

### Ilford HP5 pushed to 3200

```
Black and white film photo pushed in development, very heavy coarse grain, crushed black shadows, blown highlights.
```

:::photos
base: /images/film-sim/r3/film-ilford_hp5_pushed_to_3200
alt: Ilford HP5 pushed to 3200
:::

Darker and grittier than Tri-X. Same leftover color on the raincoat.

### Kodak T-Max 100

```
Black and white film photo, smooth tones, very fine grain, crisp detail, full range of grays.
```

:::photos
base: /images/film-sim/r3/film-kodak_t_max_100
alt: Kodak T-Max 100
:::

**Instant**

### Polaroid SX-70

```
Square instant photo with a thick white border, soft focus, faded creamy colors, warm cast, low contrast.
```

:::photos
base: /images/film-sim/r3/film-polaroid_sx_70
alt: Polaroid SX-70
:::

Adds the white instant-film border on every scene.

### Expired Polaroid

```
Old expired instant photo with a white border, chemical blotches and streaks at the edges, colors bleeding, washed out blue-pink cast.
```

:::photos
base: /images/film-sim/r3/film-expired_polaroid
alt: Expired Polaroid
:::

Almost the same as the SX-70 here. I didn't get the chemical blotches.

### Instax Mini

```
Small instant photo with a white border, bright washed out colors, slightly overexposed, soft detail.
```

:::photos
base: /images/film-sim/r3/film-instax_mini
alt: Instax Mini
:::

Also almost the same as the SX-70.

**Motion picture**

### Super 8

```
Super 8 home movie frame, very heavy grain, soft blurry detail, faded warm colors, slight flicker, rounded frame edges.
```

:::photos
base: /images/film-sim/r3/film-super_8
alt: Super 8
:::

Rounded black frame edges, like a projected home movie.

## Cameras

These are the cameras that changed something you can see. Pro camera names did nothing, so they're in the section on what didn't work.

**Cheap and toy cameras**

### Disposable

```
Overexposed snapshot, flash fired in daylight blowing out bright skin, warm yellow-green color cast, low sharpness, heavy grain, dark vignette in the corners.
```

:::photos
base: /images/film-sim/r3/camera-disposable__funsaver___quicksnap
alt: Disposable
:::

Blown-out flash on the boat and a dark flash snapshot on the street. Small change on the portrait.

### Holga

```
Square photo centered in the frame, with wide solid black bars on the left and right. Very heavy dark vignette, the corners fade to pure black, blurry smeared edges, only the center sharp, cyan shadows, yellow highlights.
```

:::photos
base: /images/film-sim/r3/camera-holga
alt: Holga
:::

A square picture with black bars on both sides. My first wording just said "square frame" and got a thin border; naming the black bars is what worked on the street and the boat. On the portrait it only added a dark frame. The vignette stays weak: no wording I tried got Z-Image to darken the corners much.

### Diana

```
Soft hazy low-contrast image, glowing blown highlights, pale washed-out pastel colors, strong vignette, blurry everywhere except the middle.
```

:::photos
base: /images/film-sim/r3/camera-diana
alt: Diana
:::

Pale, washed out and soft.

### Fisheye toy camera

```
Round fisheye image, strong barrel distortion bending straight lines, black circular edge around the picture.
```

:::photos
base: /images/film-sim/r3/camera-fisheye_toy_camera
alt: Fisheye toy camera
:::

Round black frame and bent lines.

### Sprocket Rocket

```
Very wide panoramic 35mm photo exposed across the whole film strip, sprocket holes and film edge markings visible along the top and bottom.
```

:::photos
base: /images/film-sim/r3/camera-sprocket_rocket
alt: Sprocket Rocket
:::

Sprocket holes along the top and bottom of the frame. The real camera shoots a very wide panorama, but Z-Image kept the normal frame, even when I asked for black bars above and below.

### Half-frame diptych

```
Two narrow vertical half-frame photos side by side on one strip of film, a thin dark line between them, slightly different moments.
```

:::photos
base: /images/film-sim/r3/camera-half_frame_diptych
alt: Half-frame diptych
:::

Two frames side by side.

**Old and early digital**

### Kodak Brownie box camera

```
1950s snapshot, square frame, soft focus away from the center, faded colors or black and white, small white border.
```

:::photos
base: /images/film-sim/r3/camera-kodak_brownie_box_camera
alt: Kodak Brownie box camera
:::

A faded print with a white border.

### Kodak Instamatic 110

```
Small grainy 1970s print, coarse grain, soft blurry detail, warm faded orange colors, darker edges.
```

:::photos
base: /images/film-sim/r3/camera-kodak_instamatic_110
alt: Kodak Instamatic 110
:::

Strongest on the street, where it became a warm faded print with a border.

### 2000s digicam

```
Harsh flat flash, blown-out white highlights, cool bluish white balance, oversharpened edges, noisy smudged shadows, orange date numbers printed in the bottom right corner.
```

:::photos
base: /images/film-sim/r3/camera-2000s_digicam
alt: 2000s digicam
:::

Cool flash color and an orange date stamp in the corner.

### Fujifilm Classic Chrome

```
Muted documentary colors, desaturated blues, firm shadows, slightly cool.
```

:::photos
base: /images/film-sim/r3/camera-fujifilm_classic_chrome
alt: Fujifilm Classic Chrome
:::

Muted, cooler color.

**Antique processes**

### Glass plate

```
Early 1900s glass plate photograph, monochrome, slow exposure with ghostly blur on moving people, chipped dark plate edges, silvering in the corners.
```

:::photos
base: /images/film-sim/r3/camera-glass_plate__1900s
alt: Glass plate
:::

Muted, almost colorless, with dark worn plate edges.

### Tintype / wet plate

```
Tintype wet plate photograph, dark brown-black metal plate, silvery highlights, swirling chemical streaks and pour marks at the edges, very shallow focus.
```

:::photos
base: /images/film-sim/r3/camera-tintype___wet_plate
alt: Tintype / wet plate
:::

Dark plate with worn corners.

### Daguerreotype

```
1840s daguerreotype, mirror-like silver plate, faint ghostly image, tarnished edges and oxidation, ornate brass mat around the picture.
```

:::photos
base: /images/film-sim/r3/camera-daguerreotype
alt: Daguerreotype
:::

Dark plate with worn corners, a little more faded than the tintype.

## General looks

No film stock, just a color treatment. These are the looks people usually mean when they say "make it warm" or "give it a vintage filter."

### Warm golden

```
Warm golden color, honey-toned highlights, soft amber shadows, gentle film grain.
```

:::photos
base: /images/film-sim/r3/general-warm_golden
alt: Warm golden
:::

Warmer all over.

### Faded 1970s print

```
Faded 1970s photo print, washed out colors drifting toward orange and magenta, lifted milky blacks, soft grain.
```

:::photos
base: /images/film-sim/r3/general-faded_1970s_print
alt: Faded 1970s print
:::

Pink and magenta cast.

### Faded 1990s snapshot

```
Faded 1990s drugstore photo print, slightly yellow cast, soft contrast, mild grain.
```

:::photos
base: /images/film-sim/r3/general-faded_1990s_snapshot
alt: Faded 1990s snapshot
:::

Subtle. Slightly flatter and yellower.

### Matte faded film

```
Matte faded film look, lifted gray-black shadows, low contrast, muted colors.
```

:::photos
base: /images/film-sim/r3/general-matte_faded_film
alt: Matte faded film
:::

Lifted, grayish blacks and cooler color. On my first portrait it made her eyes murky, so check faces.

### Cool muted

```
Cool muted colors, desaturated blues and greens, soft gray shadows, quiet overcast mood.
```

:::photos
base: /images/film-sim/r3/general-cool_muted
alt: Cool muted
:::

Blue-gray and quiet.

### Teal and orange

```
Teal shadows and warm orange skin tones, cinematic color grade.
```

:::photos
base: /images/film-sim/r3/general-teal_and_orange
alt: Teal and orange
:::

Exactly what it says.

### Bleach bypass

```
Bleach bypass film look, muted desaturated gritty colors, a black-and-white silver image laid over the color, skin looking cold, metallic and exhausted, deep dense shadows, bright hard highlights, prominent grain.
```

:::photos
base: /images/film-sim/r3/general-bleach_bypass
alt: Bleach bypass
:::

On the portrait, this is the real look: muted color, hard contrast, and skin that looks cold and a little metallic. On the street and the boat it goes wrong. Z-Image turned the background black and white and kept the yellow raincoat and the red boat in full color, which is selective color, not bleach bypass. It seems to happen when the scene names a strong color. My first, simpler wording only took a little color out, and a line asking it to mute even bright reds and yellows made it worse. Use this one on scenes without a single strong color.

### Sepia

```
Sepia toned old photograph, warm brown monochrome, soft faded edges.
```

:::photos
base: /images/film-sim/r3/general-sepia
alt: Sepia
:::

Brown monochrome.

### Warm vintage filter

```
Warm vintage photo filter, boosted yellows, faded blacks, soft vignette.
```

:::photos
base: /images/film-sim/r3/general-warm_vintage_filter
alt: Warm vintage filter
:::

Warm, with boosted yellows.

### Pastel dream

```
Soft pastel colors, airy overexposed highlights, pale pinks and mint greens, dreamy low contrast.
```

:::photos
base: /images/film-sim/r3/general-pastel_dream
alt: Pastel dream
:::

Bright and washed out, with pink highlights.

### Moody dark

```
Dark moody look, deep crushed shadows, muted desaturated colors, small pools of light.
```

:::photos
base: /images/film-sim/r3/general-moody_dark
alt: Moody dark
:::

Darkens the whole picture.

### Golden hour glow

```
Glowing hazy golden backlight, soft lens flare, warm bloom around the highlights.
```

:::photos
base: /images/film-sim/r3/general-golden_hour_glow
alt: Golden hour glow
:::

Softer light and a warm flare coming in from the edge of the frame.

## What didn't work

The portrait examples in this section come from my first portrait scene, a woman in a field at sunset.

**Pro cameras.** Leica, Canon AE-1, Hasselblad, Pentax 67, Rolleiflex, 4×5, Contax T2 and Olympus Mju-II changed nothing I could see. For the Hasselblad, Rolleiflex and Contax I also tried a second wording that described color and tone instead of the lens, and it didn't help. These cameras don't really have a look of their own; a Leica loaded with Portra looks like Portra. Pick the film instead.

**The iPhone.** "Bright HDR, lifted shadows, oversharpened" changed almost nothing, because Z-Image's normal output already looks like a modern phone photo. The flip phone and the Helios 44's swirly blur didn't show up either.

![Plain portrait, then Hasselblad and iPhone recipes: almost no change](/images/film-sim/r3/fail-pro-cameras.jpg#wide)

**Describing a snapshot made a selfie.** My first Contax T2 wording said "casual flash snapshot." Z-Image read that as her taking the photo, and stretched her arm out toward the camera.

![Plain portrait, then the first Contax T2 wording turning it into a selfie](/images/film-sim/r3/fail-selfie.jpg#wide)

**Double exposure.** I tried four wordings. Z-Image never laid one picture over another. It gave the portrait a twin and planted real trees along the street. If you want a double exposure, blend two images together after you make them.

![Double exposure: a second woman on the portrait, real trees on the street](/images/film-sim/r3/fail-double-exposure.jpg#wide)

**Broken film.** I tried ten ways of breaking the film: light leaks, fogged film, expired film, scratches, missed focus, motion blur, a smeared or mouldy lens, the burned end of a roll, and the double exposure above. None held up. Most came out looking like the plain image. Fogged and expired film added a slight haze or color cast, but not enough to read as damaged film. If you want light leaks or scratches, add them afterwards with an overlay.

**Vignettes.** Z-Image wouldn't darken the corners of a photo much, however I asked. That sank the Lomo LC-A, which is known for its dark corners, and the pinhole camera, which stayed sharp and only got a round black frame. Asking for a black oval frame instead made a frame, not a vignette, and on the street it came out white.

**Black and white keeps some color.** With Tri-X, HP5 and T-Max, Z-Image turned most of the picture gray but left the yellow raincoat and the boat's red paint in color. Both colors are named in the scene. The portrait's geraniums are named "red" too, yet they went gray, so naming a color doesn't always keep it. If you need true black and white, try leaving color words out of the scene, or convert the image afterwards.

**Three film stocks.** CineStill 50D and Kodak Vision3 500T, both motion picture films, mostly moved the camera. The color stayed close to the plain image, with no tungsten tint and no glow. LomoChrome Purple is supposed to turn greens purple. Instead, Z-Image added purple plants to the scene and left the rest alone.

**No real grain or glow.** None of the recipes produced grain you'd notice at normal size, or the red glow CineStill puts around lights. Z-Image renders very cleanly. 16 steps adds a little texture, and that's about it.

## What I'd use

For a natural film photo, Portra 400. For night, CineStill 800T. For strong color, Kodachrome or Velvia. For black and white, Tri-X, with the color words taken out of the scene. For something that looks found in a drawer, Polaroid, the Holga, the 2000s digicam or a tintype.

Put the recipe at the start of the prompt, and describe the look rather than naming the film. I tested one seed per look, so if a result looks off, try another seed before giving up on the recipe.

**Want this ready to run?** The [Film Looks pack](https://rgourley.gumroad.com/l/film-looks-z-image-moss) has 12 ComfyUI workflows and 119 tested prompts for Z-Image Turbo and MOSS-Image, including all 42 of these looks in a dropdown, with the settings from this post built in.

*Tested November 3, 2026, on an RTX 5080 with 16 GB of VRAM.*
