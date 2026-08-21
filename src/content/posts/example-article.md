---
record: W-002
title: '[POST TWO — replace this title]'
summary: '[One sentence. Make the argument, do not describe it.]'
kind: article
tags: ['systems', 'codebases']
published: 2026-03-14
updated: 2026-05-01
draft: false
---

[REPLACE ME.] Most engineering time is spent reading code, and almost none of it
is taught. Here is the method I use when I am dropped into a codebase I did not
write.

## Start at the edges

Find where data enters and where it leaves. Everything in between is an
implementation detail until proven otherwise.

## Follow one request end to end

Pick the most boring request in the system and trace it by hand — no debugger,
no search-and-hope. Write the call chain down as you go.

```text
handler → service → repository → store
```

## Read the tests as documentation

Tests record the behaviour someone was afraid of losing. That fear is a map of
where the sharp edges are.

## Write the document that was missing

Leave behind the note you wished existed when you started. It costs an hour and
it is the highest-leverage thing a new person can do.

> [REPLACE ME — your closing line.]
