# atoum.js
[![Build Status](https://travis-ci.org/jubianchi/atoum.js.png?branch=master)](https://travis-ci.org/jubianchi/atoum.js)
[![Dependency Status](https://www.versioneye.com/user/projects/51beb211143e1a000200496c/badge.png)](https://www.versioneye.com/user/projects/51beb211143e1a000200496c) [![Greenkeeper badge](https://badges.greenkeeper.io/jubianchi/atoum.js.svg)](https://greenkeeper.io/)

The modern, simple and intuitive PHP 5.3+ unit testing framework, now for JS

## How to install

```sh
$ git clone https://github.com/jubianchi/atoum.js.git
$ cd atoum.js
$ npm install
```

## How to use

```sh
$ bin/atoum -h

Options:
  --help, -h           Display this help message                [boolean]
  --directory, -d      Test directory                           [string]   [default: []]
  --file, -f           Test file                                [string]   [default: []]
  --xunit              Enable xUnit report                      [boolean]  [default: false]
  --xunit-output       Path to xUnit report file                [string]   [default: "xunit.xml"]
  --coverage           Enable code coverage report              [boolean]  [default: false]
  --coverage-dir       Path to sources to instrument            [string]   [default: "lib"]
  --inline             Use inline engine instead of concurrent  [boolean]
```

### Example

```sh
# This will run all tests in the given directory
$ bin/atoum -d path/to/tests/directory
```

## How to write tests

Here is an [example test](https://github.com/jubianchi/atoum.js/blob/master/tests/asserters/error.js).

[Other examples](https://github.com/jubianchi/atoum.js/tree/master/tests) with multiple test cases.

## Hacking atoum.js

```sh
# This will run the atoum.js' test suite
$ make test
```
