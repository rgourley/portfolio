---
title: "Z-Image Turbo vs FLUX 3 klein: 20 More Prompts, Every Flaw Counted"
seoTitle: "Z-Image Turbo vs FLUX: 20 Prompts, Every Flaw Counted"
description: "20 more prompts and example images."
date: "2026-10-31"
image: "/images/zimage-vs-flux-20/zimage-vs-flux-20-cover.jpg"
tags: ["AI images","ComfyUI"]
---

My [first Z-Image Turbo vs FLUX 3 klein test](/blog/z-image-turbo-vs-flux-3-klein) used five prompts. That's enough for a feel, not enough to trust, so I ran twenty new ones: weddings, markets, kitchens, classrooms, crowds, animals, weather and night scenes. This time I wrote down every flaw I found.

Z-Image Turbo won 8, FLUX 3 klein won 6, and 6 were ties. Z-Image made slightly more images with nothing wrong in them and was about three times faster. FLUX was better at motion, like a dog shaking off water or a bike splashing through a puddle. When FLUX breaks, though, it breaks in stranger ways, like a champagne glass melting into a man's face or a lamp floating in mid-air. Both models garbled almost every piece of text they tried to write.

After forty images I'm more sure of the call from the first post. Z-Image is the one I'd use by default. FLUX is the one I'd reach for when something in the scene has to be moving, and I'd run it a few times.

![Z-Image Turbo (top row) vs FLUX 3 klein (bottom row), first five of the twenty prompts](/images/zimage-vs-flux-20/zimage-vs-flux-20-hero.jpg#wide)

| | Z-Image Turbo | FLUX 3 klein |
|---|---|---|
| Better image (6 ties) | 8 | 6 |
| Images with no visible flaws | 11 of 20 | 9 of 20 |
| Garbled text | 6 | 9 |
| Broken objects or impossible physics | 3 | 4 |
| Missed part of the prompt | 4 | 4 |
| Median seconds per image | 10.5 | 36 |

"No visible flaws" means I couldn't find a problem at full size. Tiny background text that would be unreadable in a real photo anyway doesn't count.

## How I tested

Same setup as the first post: an RTX 5080 with 16 GB of VRAM, ComfyUI, full-precision models and no LoRAs. Z-Image Turbo ran at 8 steps, CFG 1, `res_multistep` and shift 3. FLUX 3 klein base ran at 30 steps, CFG 3.5 and `euler`. Neither had a negative prompt. Each prompt used the same seed on both models at 832×1040, and every image is the first seed with no re-rolls or fixes. None of the prompts are from the first post.

## 1. Wedding toast

> *a man in his forties giving a wedding toast at a reception in a rented hall, holding a microphone and a glass of champagne, string lights, guests at round tables, candid event photo*

![Wedding toast: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p06_wedding_toast.jpg#wide)

Z-Image made a clean, believable event photo, with the microphone in one hand, the glass in the other and guests reacting. FLUX has the warmer string-light mood, but the champagne glass is held in front of his face and blends into it, and there's a second glass in the hand holding the microphone. Z-Image wins.

## 2. Farmers market

> *a farmer in a straw hat selling tomatoes at a busy outdoor farmers market on a Saturday morning, wooden crates, handwritten price signs, bright overcast light*

![Farmers market: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p07_farmers_market.jpg#wide)

The tomatoes look great in both. The price signs are where it falls apart. Z-Image wrote "Tadlore R/105," and FLUX filled the frame with nonsense like "5-5ABA" and "FLIEUELGA." FLUX's market is livelier, but it also has more signs to get wrong. Slight edge to Z-Image.

## 3. Hands knitting

> *close-up of an older woman's hands knitting a red wool scarf in her lap, soft lamp light, a cup of tea on the side table*

![Knitting: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p08_hands_knitting.jpg#wide)

The hands are good in both, which surprised me. But Z-Image's needles stick out at angles nobody knits with, and she's wearing the scarf she's knitting. FLUX left out the needles and has her just holding the fabric. Neither one actually shows knitting, so it's a tie.

## 4. Runner at dawn

> *a woman in her twenties jogging along a lakeside path at dawn, breath visible in the cold air, running jacket and leggings, low sun behind her*

![Runner: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p09_runner_dawn.jpg#wide)

Z-Image made a clean backlit running shot but forgot the visible breath. FLUX has a big glowing cloud of breath and a warmer sunrise, though her ponytail sticks straight out a little stiffly. Slight edge to FLUX for doing the breath.

## 5. Late-night laundromat

> *a young man sitting on a plastic chair reading a paperback in a laundromat late at night, rows of washing machines, harsh fluorescent light, empty except for him*

![Laundromat: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p10_laundromat.jpg#wide)

Both are strong. Z-Image got the long, empty fluorescent room. FLUX is moodier, with machines stacked two high, but the signs in the window are gibberish. Tie.

## 6. Line cook plating

> *a line cook plating a dish in a busy restaurant kitchen during dinner service, steel counters, steam, order tickets on the rail, motion in the background*

![Line cook: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p11_chef_kitchen.jpg#wide)

Z-Image made a tidy over-the-shoulder shot with tickets on the rail and clean hands. FLUX has more of the rush, with blurred cooks moving behind him, but the tickets are scribbles and the plating tools look odd. FLUX has more energy and Z-Image is cleaner.

## 7. Father and daughter drawing

> *a father and his young daughter drawing with crayons at a kitchen table, papers everywhere, afternoon light, candid family moment*

![Drawing: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p12_kids_drawing.jpg#wide)

Z-Image's papers are covered in mirrored, half-formed letters, which looks strange rather than childlike. FLUX's scene is warmer and messier, but an extra hand reaches in at the right edge and belongs to no one. Z-Image wins, narrowly.

## 8. Roadside tire change

> *a mechanic changing a tire at a small roadside garage in Texas, sunlight, oil stains on the concrete, a pickup truck on a jack*

![Tire change: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p13_mechanic_tire.jpg#wide)

Z-Image put two tires side by side on the same corner of the pickup, and the truck isn't really on a jack. FLUX got it right, with the truck jacked up behind a mechanic working on a wheel. Only the cap logo is garbled. FLUX wins.

## 9. Teacher at the chalkboard

> *a high school teacher in his fifties writing a math equation on a chalkboard, students' desks in the foreground, classroom window light*

![Chalkboard: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p14_teacher_board.jpg#wide)

Neither can write math. Both boards are confident-looking nonsense. Otherwise both classrooms are believable and the hands holding chalk are fine. Tie.

## 10. Dog shaking off on the beach

> *a black labrador shaking water off on a beach at sunset, droplets flying, a tennis ball in the sand, waves behind*

![Dog: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p15_dog_beach.jpg#wide)

Z-Image's dog is wet and happy but standing still, with hardly any droplets. FLUX shows the actual shake, with water spraying off in arcs. Both dogs have the right number of legs. FLUX wins.

## 11. Couple feeding pigeons

> *an elderly couple sitting on a park bench feeding pigeons in autumn, fallen leaves, wool coats, quiet afternoon*

![Park bench: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p16_old_couple_bench.jpg#wide)

Z-Image made a lovely moment, with the couple passing food between their hands and pigeons crowding their feet. FLUX made two women sitting apart, and nobody is really feeding the birds. Z-Image wins.

## 12. Small rock concert

> *a crowd at a small indoor rock concert seen from the middle of the audience, phones held up, stage lights and haze, the band blurred in the distance*

![Concert: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p17_concert_crowd.jpg#wide)

Z-Image feels like a small club, as asked, though one person in front has a strange grid of green lights on their back. FLUX turned "small" into an arena with thousands of people. Z-Image wins.

## 13. Office meeting

> *four coworkers in a small glass meeting room looking at a laptop, sticky notes on the wall, coffee cups, ordinary office afternoon*

![Office meeting: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p18_office_meeting.jpg#wide)

Z-Image put six people in the room instead of four, and the laptop text is garbled. FLUX got four, and it looks like a real, slightly bored meeting. FLUX wins.

## 14. Shoveling snow

> *a man shoveling snow from his driveway in the morning, suburban houses, heavy snowfall, breath in the cold air, plain overcast light*

![Snow shoveling: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p19_snow_shovel.jpg#wide)

Both are clean. Z-Image remembered the breath, but the snowfall is light. FLUX went for a real storm, with snow blowing across his face. Tie.

## 15. Night-market grill

> *a street food vendor grilling skewers at a night market stall, smoke and string lights, customers waiting, warm light on the vendor's face*

![Night market: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p20_street_food.jpg#wide)

Both are beautiful, smoky night shots, and both vendors have garbled Chinese-looking characters on their aprons. FLUX added the string lights and waiting customers the prompt asked for. Slight edge to FLUX.

## 16. Barista pouring latte art

> *a barista pouring latte art into a cup behind the counter of a busy neighborhood coffee shop, espresso machine, morning rush, customers out of focus*

![Barista: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p21_barista.jpg#wide)

Z-Image got it exactly: a milk pitcher, a steady pour and a rosetta forming in the cup. FLUX has him pouring from a cup that already has latte art into another cup, and his apron says something like "Saleu." Z-Image wins.

## 17. Nurse on night shift

> *a nurse in blue scrubs writing notes at a hospital station during a night shift, monitors glowing, quiet corridor, tired but focused*

![Night nurse: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p22_night_nurse.jpg#wide)

Z-Image is dim and quiet, a convincing night shift, though it added a face mask nobody asked for. FLUX's corridor is lit like daytime, and a lamp floats in mid-air above the desk. Z-Image wins.

## 18. Reading on the train

> *a woman in her forties reading a hardcover book by the window on a commuter train, countryside passing in the window, soft daylight*

![Train: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p23_train_reader.jpg#wide)

Both are calm, believable commuter photos with motion blur outside. FLUX's book cover and the sign by the window are gibberish. Z-Image avoided the problem with a plain blue cover. Slight edge to Z-Image.

## 19. Greenhouse

> *a gardener in her sixties repotting seedlings in a small greenhouse, dirt on her gloves, rows of plants, sunlight through the glass*

![Greenhouse: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p24_greenhouse.jpg#wide)

Both are good, with dirty gloves and believable hands. FLUX's gloves and soil look more lived-in, and Z-Image is crisper. Tie.

## 20. Cyclist in the rain

> *a cyclist in a yellow rain jacket riding through a city street in the rain, puddle splashes, cars and buses in the background, overcast light*

![Cyclist: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p25_cyclist_rain.jpg#wide)

Z-Image is clean, but there's no splash and the bus sign is garbled. FLUX has the splash off the front wheel and heavier rain. FLUX wins.

## Speed and licenses

The median was 10.5 seconds per image for Z-Image Turbo and 36 for FLUX 3 klein, from ComfyUI's log. The models ran alternately, so some of FLUX's time is loading. In my first test, with fewer switches, it averaged about 26 seconds.

Z-Image Turbo is Apache 2.0 and allows commercial use. Check Black Forest Labs' license on the FLUX 3 klein model card before using it commercially.

## What the flaws tell you

Text is a lost cause for both. Price signs, aprons, book covers, chalkboards and bus signs were almost all gibberish. If you need text, leave it out of the prompt and add it afterward.

Hands were mostly fine. I found one extra hand in forty images, which is much better than these models used to do.

FLUX is better at action. Shaking dogs, splashing bikes, breath and blowing snow all came out better. Z-Image often freezes the moment just before or after.

The bigger difference is how each one fails. Z-Image gets ordinary things wrong, like six people instead of four or a missing splash. FLUX invents things that can't exist, like a barista pouring a finished latte into another cup.

*Tested October 31, 2026. Earlier: [the first 5-prompt test](/blog/z-image-turbo-vs-flux-3-klein) and [Z-Image Turbo vs Base](/blog/z-image-turbo-vs-z-image-base).*
