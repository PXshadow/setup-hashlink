# setup-hashlink

Use Cedx's [setup-hashlink](https://github.com/cedx/setup-hashlink) instead, it's well maintained and works well.


[![CI](https://img.shields.io/github/workflow/status/pxshadow/setup-hashlink/CI)](https://github.com/pxshadow/setup-hashlink/actions?query=workflow%3ACI)

This action sets up Hashlink for use in your github actions workflow.

*Supports Linux, Windows and Mac.*

## Usage

uses [action.yml](action.yml) and runs [main.js](main.js) from [Main.hx](Main.hx) source.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: pxshadow/setup-hashlink@v1.0.3
      - run: hl
```