import {jest} from '@jest/globals'

jest.unstable_mockModule('../src/db.js', () => ({
    insertDB:jest.fn(),
    getDB:jest.fn(),
    saveDB:jest.fn(),
}))

const {insertDB, getDB, saveDB} = await import('../src/db.js');
const { newNote, getAllNotes, removeNotes } = await import('../src/notes.js');

beforeEach(() => {
    insertDB.mockClear();
    getDB.mockClear();
    saveDB.mockClear();
})

describe('CLI Application', () => {
    test('newNote added', async() => {
        const note = "Test Note"
        const tags = ["tag1", "tag2"];
        const data = {
        id: Date.now(),
        tags:tags,
        content: note,
      }
      insertDB.mockResolvedValue(data);
    
      const res = await newNote(note,tags);
      expect(res).toEqual(data);
    })
    
    test('getNote should get all the notes', async () => {
        const db = {
            notes: ['note1', 'note2', 'note3']
          };
          getDB.mockResolvedValue(db);
        
          const result = await getAllNotes();
          expect(result).toEqual(db.notes);
    })
    
    test('removeNote does nothing if id is not found', async () => {
        const notes = [
          { id: 1, content: 'note 1' },
          { id: 2, content: 'note 2' },
          { id: 3, content: 'note 3' },
        ];
        saveDB.mockResolvedValue(notes);
      
        const idToRemove = 4;
        const result = await removeNotes(idToRemove);
        expect(result).toBeUndefined();
      });
})

