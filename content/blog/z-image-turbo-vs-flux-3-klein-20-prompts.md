---
title: "Z-Image Turbo vs FLUX 3 klein: 20 more prompts, every flaw called out"
seoTitle: "Z-Image Turbo vs FLUX 3 klein: 20 Prompts, Flaws Included"
description: "20 more prompts and example images."
date: "2026-10-31"
image: "/images/zimage-vs-flux-20/zimage-vs-flux-20-hero.jpg"
tags: ["AI images","ComfyUI"]
---

My [first Z-Image Turbo vs FLUX 3 klein test](/blog/z-image-turbo-vs-flux-3-klein) used five prompts. Five is enough for a feel, not enough to trust. So here are **twenty new ones**: weddings, markets, kitchens, classrooms, crowds, animals, weather and night scenes. And this time I'm calling out every flaw I found: garbled text, odd hands, objects that don't make sense.

**Short answer:** **Z-Image Turbo** won more tests (8 to 6, with 6 ties), produced slightly more flawless images and was about 3x faster. **FLUX 3 klein** was better at motion and messy real life (a dog shaking off water, a bike splashing through a puddle), but when it breaks, it breaks in stranger ways: a champagne glass melting into a man's face, a latte poured from one cup into another, a lamp floating in mid-air. Both models garble almost every piece of text they try to write.

![Z-Image Turbo (top row) vs FLUX 3 klein (bottom row), first five of the twenty prompts](/images/zimage-vs-flux-20/zimage-vs-flux-20-hero.jpg#wide)

## The tally

| | Z-Image Turbo | FLUX 3 klein |
|---|---|---|
| Better image (6 ties) | **8** | 6 |
| Images with no visible flaws | **11 of 20** | 9 of 20 |
| Garbled text (signs, labels, books, boards) | 6 | 9 |
| Broken objects or impossible physics | 3 | 4 |
| Missed part of the prompt (count, action, setting) | 4 | 4 |
| Speed (median per image) | **~10.5 s** | ~36 s |

"No visible flaws" means I couldn't find a problem at full size. Tiny background text that's unreadable in a real photo anyway doesn't count against either model.

## How I tested

- **Hardware:** RTX 5080 (16 GB VRAM), 32 GB RAM, Windows 11, ComfyUI.
- **Models:** `z_image_turbo_bf16` ([Z-Image Turbo](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo)) and `flux3-image-klein-base-bf16` ([FLUX 3 klein base](https://huggingface.co/black-forest-labs/flux-3-image-klein-base)). Full-precision files, no LoRAs.
- **Settings:** each model at its recommended settings. Z-Image Turbo: 8 steps, CFG 1, `res_multistep`, shift 3. FLUX 3 klein: 30 steps, CFG 3.5, `euler`. No negative prompt on either.
- **Fairness:** same prompt and same seed for both models, 832×1040 (4:5). Every image is a one-shot: first seed only, no re-rolls, no cherry-picking, no inpainting or upscaling.
- **Prompts:** twenty new ones, none reused from the first post.
- **Tested:** October 31, 2026.

## The 20 tests

### 1. Wedding toast

> *a man in his forties giving a wedding toast at a reception in a rented hall, holding a microphone and a glass of champagne, string lights, guests at round tables, candid event photo*

![Wedding toast: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p06_wedding_toast.jpg#wide)

Z-Image is a clean, believable event photo: microphone in one hand, glass in the other, guests reacting. FLUX has the warmer string-light mood, but the champagne glass is held up in front of his face and **blends into it**, and there's a second glass in the hand holding the microphone. **Winner: Z-Image.**

### 2. Farmers market

> *a farmer in a straw hat selling tomatoes at a busy outdoor farmers market on a Saturday morning, wooden crates, handwritten price signs, bright overcast light*

![Farmers market: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p07_farmers_market.jpg#wide)

The tomatoes look great in both. The handwritten price signs are where it falls apart: Z-Image writes "Tadlore R/105", and FLUX fills the frame with nonsense prices and words ("5-5ABA", "FLIEUELGA"). FLUX's busier market is more lively; it also has more signs to get wrong. **Edge: Z-Image**, for fewer broken signs.

### 3. Hands knitting

> *close-up of an older woman's hands knitting a red wool scarf in her lap, soft lamp light, a cup of tea on the side table*

![Knitting: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p08_hands_knitting.jpg#wide)

Hands are good in both, which is notable. But Z-Image's needles don't make sense: they stick out of the work at angles no one knits with, and she's somehow wearing the scarf she's knitting. FLUX skipped the needles entirely; she's just holding the fabric. **Tie: both miss the act of knitting.**

### 4. Runner at dawn

> *a woman in her twenties jogging along a lakeside path at dawn, breath visible in the cold air, running jacket and leggings, low sun behind her*

![Runner: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p09_runner_dawn.jpg#wide)

Z-Image is a clean backlit running shot but forgot the visible breath. FLUX has a big glowing cloud of breath and a nicer warm sunrise; the ponytail flying straight out is a bit stiff. No anatomy problems in either. **Edge: FLUX**, for actually doing the breath.

### 5. Late-night laundromat

> *a young man sitting on a plastic chair reading a paperback in a laundromat late at night, rows of washing machines, harsh fluorescent light, empty except for him*

![Laundromat: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p10_laundromat.jpg#wide)

Both are strong. Z-Image nails the long, empty, fluorescent room. FLUX is moodier, with machines stacked two high, but the signs in the window are gibberish. **Tie.**

### 6. Line cook plating

> *a line cook plating a dish in a busy restaurant kitchen during dinner service, steel counters, steam, order tickets on the rail, motion in the background*

![Line cook: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p11_chef_kitchen.jpg#wide)

Z-Image gives a tidy over-the-shoulder shot with tickets on the rail and clean hands. FLUX better captures the rush, with blurred cooks moving behind him, but the tickets on the counter are scribbles and the plating tools look odd. **Edge: FLUX on energy, Z-Image on cleanliness.**

### 7. Father and daughter drawing

> *a father and his young daughter drawing with crayons at a kitchen table, papers everywhere, afternoon light, candid family moment*

![Drawing: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p12_kids_drawing.jpg#wide)

Z-Image's papers are covered in mirrored, half-formed letters ("ʎɯ", "bea"), which reads as strange rather than childlike. FLUX's scene is warmer and more chaotic, but there's an **extra hand** reaching in at the right edge that belongs to no one, and the crayon labels are garbled. **Winner: Z-Image**, narrowly.

### 8. Roadside tire change

> *a mechanic changing a tire at a small roadside garage in Texas, sunlight, oil stains on the concrete, a pickup truck on a jack*

![Tire change: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p13_mechanic_tire.jpg#wide)

Z-Image put **two tires side by side** on the same corner of the pickup, and the truck isn't really on a jack. FLUX gets it right: truck jacked up in the background, mechanic in gloves working on a wheel on the ground. The cap logo is garbled. **Winner: FLUX.**

### 9. Teacher at the chalkboard

> *a high school teacher in his fifties writing a math equation on a chalkboard, students' desks in the foreground, classroom window light*

![Chalkboard: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p14_teacher_board.jpg#wide)

As expected, **neither can write math**. Both boards are confident-looking nonsense ("Aₙ = 中"). Otherwise both classrooms are believable, and hands holding chalk are fine. **Tie.**

### 10. Dog shaking off on the beach

> *a black labrador shaking water off on a beach at sunset, droplets flying, a tennis ball in the sand, waves behind*

![Dog: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p15_dog_beach.jpg#wide)

Z-Image's dog is wet and happy, but standing still: no shake, few droplets. FLUX shows the actual shake, with water spraying off its coat in arcs. Both dogs have the right number of legs. **Winner: FLUX.**

### 11. Couple feeding pigeons

> *an elderly couple sitting on a park bench feeding pigeons in autumn, fallen leaves, wool coats, quiet afternoon*

![Park bench: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p16_old_couple_bench.jpg#wide)

Z-Image is a lovely moment: a man and woman passing food between their hands, pigeons crowding their feet. FLUX's two women sit apart and nobody is really feeding the birds. No flaws in either. **Winner: Z-Image.**

### 12. Small rock concert

> *a crowd at a small indoor rock concert seen from the middle of the audience, phones held up, stage lights and haze, the band blurred in the distance*

![Concert: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p17_concert_crowd.jpg#wide)

Z-Image feels like a small club, matching the prompt, though one person in the foreground has a strange grid of green lights on their back. FLUX turned "small" into an arena with thousands of people. Hands holding phones are fine in both. **Winner: Z-Image.**

### 13. Office meeting

> *four coworkers in a small glass meeting room looking at a laptop, sticky notes on the wall, coffee cups, ordinary office afternoon*

![Office meeting: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p18_office_meeting.jpg#wide)

Z-Image put **six people** in the room, not four, and the laptop screen text is garbled. FLUX gets four, and it looks like a real, slightly bored meeting. **Winner: FLUX.**

### 14. Shoveling snow

> *a man shoveling snow from his driveway in the morning, suburban houses, heavy snowfall, breath in the cold air, plain overcast light*

![Snow shoveling: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p19_snow_shovel.jpg#wide)

Both are clean. Z-Image remembers the visible breath but the snowfall is light. FLUX goes for a real storm, with snow blowing across his face. **Tie.**

### 15. Night-market grill

> *a street food vendor grilling skewers at a night market stall, smoke and string lights, customers waiting, warm light on the vendor's face*

![Night market: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p20_street_food.jpg#wide)

Both are beautiful, smoky night shots, and both vendors have **garbled Chinese-looking characters** on their aprons. FLUX adds the string lights and waiting customers the prompt asked for. **Edge: FLUX.**

### 16. Barista pouring latte art

> *a barista pouring latte art into a cup behind the counter of a busy neighborhood coffee shop, espresso machine, morning rush, customers out of focus*

![Barista: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p21_barista.jpg#wide)

Z-Image gets it exactly: milk pitcher, steady pour, rosetta forming in the cup. FLUX made a physics mistake: he's pouring **from a cup that already has latte art into another cup**, and his apron says something like "Saleu". **Winner: Z-Image.**

### 17. Nurse on night shift

> *a nurse in blue scrubs writing notes at a hospital station during a night shift, monitors glowing, quiet corridor, tired but focused*

![Night nurse: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p22_night_nurse.jpg#wide)

Z-Image is dim and quiet, a convincing night shift, though it added a face mask nobody asked for. FLUX's corridor is brightly lit like daytime, and a **lamp floats in mid-air** above the desk, attached to nothing. **Winner: Z-Image.**

### 18. Reading on the train

> *a woman in her forties reading a hardcover book by the window on a commuter train, countryside passing in the window, soft daylight*

![Train: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p23_train_reader.jpg#wide)

Both are calm, believable commuter photos with motion blur outside. FLUX's book cover and the sign by the window are gibberish ("Moer ed nilliva"); Z-Image's plain blue cover sidesteps the problem. **Edge: Z-Image.**

### 19. Greenhouse

> *a gardener in her sixties repotting seedlings in a small greenhouse, dirt on her gloves, rows of plants, sunlight through the glass*

![Greenhouse: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p24_greenhouse.jpg#wide)

Both are good, with dirty gloves and believable hands. FLUX's gloves and soil look a little more lived-in; Z-Image is crisper. No flaws in either. **Tie.**

### 20. Cyclist in the rain

> *a cyclist in a yellow rain jacket riding through a city street in the rain, puddle splashes, cars and buses in the background, overcast light*

![Cyclist: Z-Image Turbo left, FLUX 3 klein right](/images/zimage-vs-flux-20/p25_cyclist_rain.jpg#wide)

Z-Image is clean, but there's no puddle splash and the bus destination sign is garbled. FLUX delivers the splash from the front wheel and heavier rain. **Winner: FLUX.**

## What the flaws tell you

- **Text is a lost cause for both.** Price signs, aprons, book covers, chalkboards, bus signs: almost every attempt is gibberish. If text matters, avoid it in the prompt or add it afterward.
- **FLUX's flaws are weirder.** Z-Image tends to be wrong in ordinary ways (six people instead of four, a missing splash). FLUX invents things that can't exist: a glass inside a face, a floating lamp, pouring from a full cup.
- **FLUX does action better.** Shaking dogs, splashing bikes, breath, blowing snow. Z-Image often freezes the moment just before or after.
- **Hands were mostly fine in both.** One extra hand from FLUX in twenty images, which is much better than these models used to be.

## Speed (measured)

| Model | Steps | Median seconds per image (832×1040) |
|---|---|---|
| Z-Image Turbo | 8 | **~10.5 s** |
| FLUX 3 klein (base) | 30 | ~36 s |

Times are from ComfyUI's execution log on the RTX 5080. The two models ran alternately, so some of FLUX's time is model loading; in my first test, with fewer switches, it averaged ~26 s.

## Licenses

- **Z-Image Turbo:** Apache 2.0 (commercial use allowed).
- **FLUX 3 klein:** check Black Forest Labs' license on the model card before commercial use.

## FAQ

**Which is better overall?** Z-Image Turbo, on this set: cleaner images, fewer strange errors, and much faster. FLUX 3 klein is the better choice when you need motion or a messier, more candid feel, and you're willing to re-roll.

**Can either model write text?** Not reliably. Both garbled nearly every sign, label and board in these tests.

**Do they still mess up hands?** Rarely. I found one extra hand (FLUX) in forty images.

**Does it run on 16 GB of VRAM?** Both ran on my 16 GB RTX 5080 at full precision.

---

*Tested and written October 31, 2026. Earlier: [the first 5-prompt test](/blog/z-image-turbo-vs-flux-3-klein) and [Z-Image Turbo vs Z-Image base](/blog/z-image-turbo-vs-z-image-base).*
