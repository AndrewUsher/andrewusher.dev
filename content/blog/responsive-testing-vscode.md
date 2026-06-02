
---
date: 2026-06-01
isPublished: true
slug: responsive-testing-vscode
tags: ["vscode", "web-development", "css", "productivity", "opinion"]
title: Responsive testing without leaving VS Code
---

VS Code 1.122 shipped last week. Tucked between the AI billing overhaul and the new agent window is a feature I've been wanting for a while: device emulation in the integrated browser.

It's not flashy. But if you've ever spent an afternoon opening Chrome DevTools, resizing to exactly 375px, realizing the breakpoint is off by a pixel, then doing it again for tablet, then again for that weird iPhone-sized gap nobody planned for... you get why this matters.

## The old way vs. the new way

Before this release, testing responsiveness in VS Code meant either keeping a real browser open alongside your editor, or installing an extension. The integrated browser existed, but it was basically a webview with an address bar. Useful for previewing localhost apps. Not useful for catching mobile layout bugs.

Now there's a proper emulation toolbar. Screen sizes, touch emulation, custom user-agent strings. Everything you'd get from Chrome DevTools, but inside the editor.

Open the integrated browser (globe button in the title bar, or `Ctrl+Alt+/`), click the overflow menu in the browser tab, and select **Show Emulation Toolbar**. The toolbar drops in with device presets, dimensions, orientation, and touch toggle. Pick an iPhone or a tablet or just punch in custom pixel dimensions.

That's it. No tab switch. No second monitor. The same window where you're editing CSS now shows you exactly how it breaks on mobile.

## Where it gets interesting

The emulation alone is handy. But pair it with two other pieces of VS Code's browser tooling and it starts to feel like more than the sum of its parts.

First, the integrated browser has DevTools built in. So you can have your responsive preview on one side and the element inspector on the other, both inside the editor. Spot an overflown element at 768px? Inspect it right there, find the offending CSS, fix it in your source file, refresh. All without leaving VS Code.

Second, and this is the part I'm still forming an opinion on: agents can drive the browser too.

If you have enabled browser tools (`workbench.browser.enableChatTools`), an agent can open pages, click around, take screenshots, and even run Playwright code. That includes resizing the viewport. So you can ask something like:

> "Open the app, take a screenshot at 375px and 768px, and tell me if the nav menu overlaps the content."

The agent opens the page, resizes the viewport twice, takes screenshots, and reports back. I've tried this on a couple projects. It works. It's a little slow. But it's undeniably useful for catching layout regressions without writing a full Playwright test suite.

## The limitations

A few things worth being honest about.

Device emulation in VS Code uses the same engine Chrome DevTools does, but it's still emulation. It adjusts viewport size, user-agent string, and touch behavior. It doesn't change CPU architecture, memory constraints, or real touch hardware. If you need to test actual mobile performance or gesture handling, you need a real device or an emulator.

Also, the emulation toolbar lives in the overflow menu rather than having its own dedicated button. Two clicks instead of one. Minor, but you'll notice it if you toggle frequently.

And the agent-driven testing mentioned earlier is experimental. You need to opt in, and the agent can be slow on complex pages.

## Should you use it?

If you write CSS for a living, yes. The integrated browser with device emulation is stable and ready. It won't replace Chrome DevTools entirely, but it fills a specific gap: the one between "I'm editing code and want a quick responsive check" and "I need to open a full browser and switch contexts."

For the agent-driven testing, I'd call it promising but not there yet. Useful for automated regression checks on specific viewports. But if you already have an E2E suite  setup for this, you don't need to switch.

The real win is how little friction this adds. Open the browser, toggle the toolbar, pick a device. Done. No alt-tab, no second window, no excuses for skipping the mobile check before pushing.
