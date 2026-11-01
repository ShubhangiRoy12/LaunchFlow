# LaunchFlow AI

An AI Creative Director platform for product launches. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Setup

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## File Structure

```
src/
  app/
    page.tsx                        # Homepage
    layout.tsx                      # Root layout
    globals.css                     # Global styles
    workflow/
      layout.tsx                    # Workflow layout (sidebar)
      page.tsx                      # Step 1: Product Input
      intelligence/page.tsx         # Step 2: Product Intelligence
      creative/page.tsx             # Step 3: Creative Director
      prompt/page.tsx               # Step 4: Prompt Studio
      storyboard/page.tsx           # Step 5: Storyboard
      motion/page.tsx               # Step 6: Motion Design
      preview/page.tsx              # Step 7: Video Preview
      export/page.tsx               # Step 8: Export
  components/
    landing/
      Navbar.tsx
      Hero.tsx
      ProductIntelligence.tsx
      CreativeDirectorSection.tsx
      StoryboardSection.tsx
      MotionPricingSection.tsx
      Footer.tsx
    workflow/
      WorkflowLayout.tsx
```

## Stack
- Next.js 15
- TypeScript
- Tailwind CSS
- Lucide React icons
- DM Sans font (Google Fonts)
