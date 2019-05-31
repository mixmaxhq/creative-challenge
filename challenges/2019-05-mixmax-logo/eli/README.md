# mixmin (48)

An unoptimized but very terse (48 bytes) script that emits the Mixmax logo with the desired dimensions.

```bash
$ pyth mixmin <<< $'50\n16'
```

More
----

For more help, try `mixmore`:

```sh
$ ./mixmore
usage: mixmore <width> [<height>]
$ ./mixmore 50 16
██████████          ██████████          ██████████
██████████         ███████████        ████████████
██████████       █████████████       █████████████
██████████      ██████████████      ██████████████
██████████     ███████████████    ████████████████
██████████    ████████████████   █████████████████
██████████  ██████████████████  ██████████████████
██████████ ███████████████████ ███████████████████
███████████████████ ███████████████████ ██████████
██████████████████  ██████████████████  ██████████
█████████████████   ████████████████    ██████████
████████████████    ███████████████     ██████████
██████████████      ██████████████      ██████████
█████████████       █████████████       ██████████
████████████        ███████████         ██████████
██████████          ██████████          ██████████
```

You'll need the [pyth] runtime.

Recommended height-width ratio: `0.32768`.

[pyth]: https://github.com/isaacg1/pyth