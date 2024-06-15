
# Notifie

With notifie you can create notes with CLI and view them in web browser




## Installation

1. Clone the repo

```bash
git clone https://github.com/navindu-sachintha/notifie.git
```
2. cd into repo
```bash
cd notifie
```
3. Install node modules
```bash
npm i || npm install
```
4. Create a link with bin
```bash
npm link
```


# Usage

note <command>

| Command  | Description |
|----------|-------------|
|note new <note>     |Create a new note|
|note all            |Get all notes|
|note find <filter>  |Get matching notes|
|note remove <id>    |Remove note by id|
|note web [port]     |Launch Web UI to see notes|
|-note clean         |Remove all notes, This action can't be recover

| Option | Description |
|--------|-------------|
|--help  |   Show help |
|--version |  Show version number|
|-t, --tags | You can add tags to note|

## Example

```bash
note new "Hello world note" -t "todo,morning"
```