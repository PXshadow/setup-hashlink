# setup-hashlink

This action sets up Hashlink for use in your github actions workflow.

## Usage

uses [action.yml](action.yml) and runs [main.js](main.js) from [Main.hx](Main.hx) source.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: pxshadow/setup-hashlink@v1
      - run: hl
```