const cds = require('@sap/cds');
const { parseString } = require('xml2js');

module.exports = cds.service.impl(async (srv) => {

    srv.on('checkisbn', (req) => {
        console.log('ISBN');


        // var xmlstr = '<bookstore><book category="COOKING"><title lang="en">The Boston Cooking-School Cookbook</title><author>Fannie Merrit Farmer</author><year>1896</year><price>49.99</price></book><book category="CHILDREN"><title lang="en">The Wonderful Wizard of Oz</title><author>L. Frank Baum</author><year>1900</year><price>39.95</price></book><book category="CHILDREN"><title lang="en">Alices Adventures in Wonderland</title><author>Charles "Lewis Carroll" Dodgeson</author><author>Charles Dodgeson</author><author>Lewis Carroll</author><year>1865</year><price>29.99</price></book><book category="MUSIC"><title lang="en">Gilbert and Sullivan Opera; A History and a Comment</title><author>H. M. Walbrook</author><year>1922</year><price>30.00</price></book></bookstore>';
        // var xml = new XML (xmlstr);
        // console.log(xml);

        var xmlstr1 = `<bookstore>
        <book category="COOKING">
            <title lang="en">The Boston Cooking-School Cookbook</title>
            <author>Fannie Merrit Farmer</author>
            <year>1896</year>
            <price>49.99</price>
        </book>
        <book category="CHILDREN">
            <title lang="en">The Wonderful Wizard of Oz</title>
            <author>L. Frank Baum</author>
            <year>1900</year>
            <price>39.95</price>
        </book>
        <book category="CHILDREN">
            <title lang="en">Alice's Adventures in Wonderland</title>
            <author>Charles "Lewis Carroll" Dodgeson</author>
            <author>Charles Dodgeson</author>
            <author>Lewis Carroll</author>
            <year>1865</year>
            <price>29.99</price>
        </book>
        <book category="MUSIC">
            <title lang="en">Gilbert and Sullivan Opera; A History and a Comment</title>
            <author>H. M. Walbrook</author>
            <year>1922</year>
            <price>30.00</price>
        </book>
    </bookstore>`;

        parseString(xmlstr1, (err, result) => {
            var data = JSON.stringify(result);
            // console.log(data);
        });
        console.log(process.env.FNL);




        var axios = require('axios');

        const isbn = req.data.isbn;
        // var data = '<?xml version="1.0" encoding="utf-8"?>\n<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n  <soap:Body>\n    <IsValidISBN13 xmlns="http://webservices.daehosting.com/ISBN">\n      <sISBN>978-1-4612-9090-2</sISBN>\n    </IsValidISBN13>\n  </soap:Body>\n</soap:Envelope>';
        var data = `<?xml version="1.0" encoding="utf-8"?>\n<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n  <soap:Body>\n    <IsValidISBN13 xmlns="${process.env.FNL}">\n      <sISBN>${isbn}</sISBN>\n    </IsValidISBN13>\n  </soap:Body>\n</soap:Envelope>`;
        console.log(data);
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            // url: 'http://webservices.daehosting.com/services/isbnservice.wso',
            url: process.env.URL,
            headers: {
                'Content-Type': 'text/xml; charset=utf-8'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                // console.log(error);
            });

        return 'ISBN';
    });
});