# Mixmax Cat Facts

The API to power a cat facts slash command in Mixmax. Easily add cat facts to any email!

## What is Mixmax?

[Mixmax](https://mixmax.com) simplifies your life by letting you automate your email-based
workflows, meaning you can spend less time on the boring stuff and more time making
meaningful connections with people.

## Why cat facts?

This is an example of a [Mixmax Slash Command](https://developer.mixmax.com/docs/overview-slash-commands),
a custom enhancement to Mixmax that lets you easily add rich content to your email. Creating
your own slash commands makes Mixmax an even more powerful tool.

Plus, cats are awesome 🐈.

## How do I use it?

You'll need [a Mixmax account](https://mixmax.com) and [a Glitch account](https://glitch.com). Go ahead
and sign up. Once you're done, come back to [mixmax-cat-facts on Glitch](https://glitch.com/edit/#!/mixmax-cat-facts).


First, [clone this project on Glitch](https://glitch.com/edit/#!/remix/mixmax-cat-facts). You'll need
to give it a new name. Something like _yourname-cat-facts_ will do. To use this slash command as-is,
you'll need to open up the `.env` file and add a line like

    USERS=you@example.com

with the email address that you used to sign up for Mixmax. That allows you to use the command.

Now go on over to your [Mixmax Developer Settings](https://app.mixmax.com/dashboard/settings/developer)
and let's get this slash command set up. At the bottom of the "Slash Commands" section, click the
"Add Slash Command" button. A form will open up. Fill it out as follows:

* **Name:** `Cat Facts`
* **Command:** `/cat`
* **Parameter placeholder:** `[1 - 16]`
* **Command Parameter Suggestions API URL:** `https://yourname-cat-facts.glitch.me/suggest`
* **Command Parameter Resolver API URL:** `https://yourname-cat-facts.glitch.me/resolve`

Now click "Add Slash Command", then refresh the page and click the "Compose" button in the
top-left of the Mixmax dashboard to open up a new email composition window. In the body of
the new email, type `/cat` and follow the prompts.

![Example of a cat fact in a Mixmax email](https://cdn.glitch.com/a2108d0a-fb99-4d5d-a039-25faeb9ab857%2FScreen%20Shot%202019-10-24%20at%2010.08.05%20AM.png?v=1571926105003)

## Cool!

Yes. This barely scratches (heh) the surface of what Mixmax can do for you. If you're interested
in learning more, check out the [Mixmax Developer Portal](https://developer.mixmax.com) to learn
more about extending Mixmax's capabilities. If you want to work for a company building amazing
tools to make people's lives and communication easier, [we're hiring!](https://mixmax.com/careers)
