const util = require("util");
const fs = require("fs");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class Store {
    read () {
        return readFileAsync('db/db.json', 'utf8');
    };

    write (note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    };

    getNotes () {
        return this.read().then((notes) => {
            let parsedNotes;
      
            try {
            parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
            parsedNotes = [];
            }
            return parsedNotes;
        });
    };

    randomID () {
        const newID = Math.floor(Math.random * 1000);
        return newID;
    }

    addNote (note) {
        const ID = this.randomID();
        const {title, text} = note;
        const newNote = {
            title: title,
            text: text,
            id: ID,
        } // store an id (check id's or pick a random number)
        return this.getNotes().then((notes) => {
            console.log(notes);
            console.log("///////");
            console.log(note);
            notes.push(newNote);
            this.write(notes);
        })
    };

    // removeNote (note) {
        
    // };
};



module.exports = new Store();