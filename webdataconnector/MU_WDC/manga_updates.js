(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var genreCols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Genre",
            alias: "manga type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Description",
            alias: "genre description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Series",
            alias: "number of manga of this type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Authors",
            alias: "number of authors of manga of this type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Filters",
            alias: "number filters of manga of this type???",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Highlights",
            alias: "number of highlight manga of this type???",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Demographic",
            alias: "are there readers of this type of manga",
            dataType: tableau.dataTypeEnum.bool
        }];

        var usersCols = [{
            id: "Category_id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Title",
            alias: "category type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Position",
            alias: "category position",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Entry_id",
            alias: "entry id value",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "User_Position",
            alias: "position value",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Username",
            alias: "username",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "User_id",
            alias: "user id",
            dataType: tableau.dataTypeEnum.int
        }];

        var genreSchema = {
            id: "MangaGenre",
            alias: "Manga genres available in manga updates",
            columns: genreCols
        };

        var usersSchema = {
            id: "MangaUsers",
            alias: "Manga user data",
            columns: usersCols
        };

        schemaCallback([genreSchema, usersSchema]);
        // schemaCallback([usersSchema]);
    };

    // Download the data
    myConnector.getData = function(genreTable, userTable, doneCallback) {
        $.getJSON("http://localhost:8889/api.mangaupdates.com/v1/genres", function(resp) {
            var feat = resp,
                genreData = [];
            var len = Object.keys(resp).length
            // Iterate over the JSON object
            for (var i = 0; i < len; i++) {
                genreData.push({
                    "id": feat[i].id,
                    "Genre": feat[i].genre,
                    "Description": feat[i].description,
                    "Series": feat[i].stats.series,
                    "Authors": feat[i].stats.authors,
                    "Filters": feat[i].stats.filters,
                    "Highlights": feat[i].stats.highlights,
                    "Demographic": feat[i].demographic
                });
            }
            console.log(genreData)
            console.log(genreTable)

            genreTable.appendRows(genreData);
            doneCallback();
        });

        $.getJSON("http://localhost:8889/api.mangaupdates.com/v1/aboutus/users", function(resp) {
            var feat = resp,
                userData = [];
            var len = Object.keys(resp).length

            // Iterate over the JSON object
            for (var i = 0; i < len; i++) {
                var usersLen = Object.keys(feat[i].users).length;
                for (var j = 0; j < usersLen; j++) {
                    userData.push({
                        "category_id": feat[i].category_id,
                        "Position": feat[i].position,
                        "Title": feat[i].title,
                        "Entry_id": feat[i].users[j].entry_id,
                        "User_Position": feat[i].users[j].position,
                        "Username": feat[i].users[j].username,
                        "User_id": feat[i].users[j].user_id
                })};
            }
            console.log(userData)
            console.log(userTable)

            userTable.appendRows(userData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Manga Updates API"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
