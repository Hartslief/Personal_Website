# Portfolio WebApp

This is my portfolio website. It contains/will contain information about me and what my skills are.
This will mainly be the place where I display my little side projects or anything that I find interesting.

## How It Works :3

### Tech Stack

- Typescript + Next.js : Language and framework
- Firestore + Storage : DB and large file (images) storage
- Firebase Analytics : Analytics dashboard
- Firebase App Hosting : Hosting and Deployment
- Firebase Functions : Backend functions for securely fetching/delivering data

## Writing & Publishing Blog Posts

Blog posts are written in Markdown and published via a local CLI script. No CMS or admin panel is required.

### Setup

Ensure your `.env.local` file contains the following variables:

\```
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=your-firebase-auth-password
\```

### Creating a post

Create a folder anywhere on your machine with an `index.md` file and any images you want to use:

\```
my-post/
index.md
cover.jpg
any-other-image.png
\```

### Frontmatter

Every post requires the following frontmatter at the top of `index.md`:

## \```markdown

title: My Post Title
slug: my-post-title
excerpt: A short description shown in the post list.
tags: [tag1, tag2]
coverImage: cover.jpg
draft: false

---

### Publishing

From the repo root, run:

\```bash
npm run publish /path/to/my-post
\```

The script will:

1. Parse the Markdown and frontmatter
2. Upload any images to Firebase Storage
3. Convert the Markdown to HTML
4. Push the post to Firestore via a Firebase Function

If a post with the same slug already exists it will be updated rather than duplicated.

### Updating a post

Edit your `index.md`, then run the same publish command again. The existing post will be updated in place.

## Commands

- Deploy Functions:

```
npm run deploy
```

- Start Emulator:

```
npm run emulators
```
