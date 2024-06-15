import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { newNote, getAllNotes, findNotes, removeNotes, removeAllNotes } from './notes.js'
import { listNotes } from './utils.js'
import { start } from './server.js'

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', yargs => {
    return yargs.positional('note',{
        type: 'string',
        describe: 'The content of the note',
    }
    )
  }, async (argv) => {
    const tags = argv.tags ? argv.tags.split(',') : [];
    const note = await newNote(argv.note, tags);
    console.log('New Note Added!', note);

  })
  .option('tags',{
    alias: 't',
    type: 'string',
    decription: 'tags to add note'
  })
  .command('all', 'Get all notes', () => {}, async () => {
    const notes = await getAllNotes();
    listNotes(notes);
  })
  .command('find <filter>', 'Get matching notes', yargs => {
    return yargs.positional('filter',{
        describe: 'The search term to filter notes by, will be applied to note.content',
        type: 'string'
    })
  }, async (argv) => {
    const matches = await findNotes(argv.filter)
    listNotes(matches);
  })
  .command('remove <id>', 'Remove note by id',yargs => {
    return yargs.positional('id', {
        type: 'number',
        describe: 'id of the note you want to delete'
    })
  }, async (argv) => {
    const id = await removeNotes(argv.id);
    if(id){
      console.log('Removed note with id: ',id)
    }else{
      console.log("No note with this id")
    }
  })
  .command('web [port]', 'Launch Web UI to see notes', yargs => {
    return yargs
        .positional('port', {
            type: 'number',
            default: 5000,
            describe: 'Port to bind on'
        })
  }, async(argv) => {
    const notes = await getAllNotes()
    start(notes,argv.port)
  })
  .command('clean', "Remove all notes, This action can't be recover",() => {}, async () => {
    await removeAllNotes();
    console.log("All notes are Removed");
  })
  .demandCommand(1)
  .parse()