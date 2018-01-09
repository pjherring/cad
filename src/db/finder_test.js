const expect = require('expect.js');
const db = require('.');

describe('Finder', () => {
    
    before(async() => {
        db.bootstrap.connect();
    });

    beforeEach(() => {
        db.finder.truncate('debates');

    });

    it('should insert into the debates table', () => {
        let finder = db.finder.get('debates');

        let results, fields = await finder.insert(
            ['title', 'create_date', 'update_date'],
            ['Debate 1', 50, 50]
        );

        console.log(results, fields);
    });

});
