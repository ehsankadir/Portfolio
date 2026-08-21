---
record: P-002
title: '[PROJECT TWO — replace this title]'
tagline: '[One line of positioning. What it is, in plain words.]'
depth: case-study
category: Machine Learning
year: 2025
status: active
featured: true
order: 2
technologies: ['Python', 'PyTorch', 'FastAPI', 'AWS']
draft: false
---

## Overview

[REPLACE ME.] What this is and where it stands. Two or three sentences.

## The problem

[REPLACE ME.] What was hard, and for whom. Resist making the previous approach
sound stupid — explain the constraints that made it reasonable at the time.

## Approach

[REPLACE ME.] Prose first, technology names second.

## Architecture

[REPLACE ME.] How data enters, where it becomes durable, and what happens when
a component is unavailable. If you have a diagram, add the image to
`src/assets/` and reference it here.

```python
# The one snippet that actually explains the idea.
# Not a tutorial excerpt, not boilerplate.
def route(record: Record) -> Sink:
    return Sink.DURABLE if record.critical else Sink.SAMPLED
```

## Challenges

[REPLACE ME.] The part that took three times longer than planned, and why.

## Results

[REPLACE ME.] Real numbers only.

## Next

[REPLACE ME.] What you would build next if the work continued.
