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

        var dailyRelCols = [{
            id: "Total_hits",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Page",
            alias: "page number",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Per_page",
            alias: "per page???",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "id",
            alias: "id value",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Title",
            alias: "series title",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Volume",
            alias: "volume released",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Chapter",
            alias: "chapter released",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Group_name",
            alias: "name of group",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Group_id",
            alias: "id of group",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Release_date",
            alias: "date of release",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Series_id",
            alias: "id of the series",
            dataType: tableau.dataTypeEnum.int
        }
    ];

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

        var dailyRelSchema = {
            id: "DailyMangaReleases",
            alias: "Manga daily release data",
            columns: dailyRelCols
        };

        schemaCallback([genreSchema, usersSchema, dailyRelSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("http://localhost:8889/api.mangaupdates.com/v1/genres", function(resp) {
            var feat = resp,
                genreData = [];
            var len = Object.keys(resp).length
            // Iterate over the JSON object
            if (table.tableInfo.id == "MangaGenre") {
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
            }

            table.appendRows(genreData);
            doneCallback();
        });

        $.getJSON("http://localhost:8889/api.mangaupdates.com/v1/aboutus/users", function(resp) {
            var feat = resp,
                userData = [];
            var len = Object.keys(resp).length

            // Iterate over the JSON object
            if (table.tableInfo.id == "MangaUsers") {
                for (var i = 0; i < len; i++) {
                    var usersLen = Object.keys(feat[i].users).length;
                    for (var j = 0; j < usersLen; j++) {
                        userData.push({
                            "Category_id": feat[i].category_id,
                            "Position": feat[i].position,
                            "Title": feat[i].title,
                            "Entry_id": feat[i].users[j].entry_id,
                            "User_Position": feat[i].users[j].position,
                            "Username": feat[i].users[j].username,
                            "User_id": feat[i].users[j].user_id
                    })};
                }
            }

            table.appendRows(userData);
            doneCallback();
        });

        $.getJSON("http://localhost:8889/https://api.mangaupdates.com/v1/releases/days/?include_metadata=true", function(resp) {
            var feat = resp,
                dailyRelData = [];
            var resLen = Object.keys(resp.results).length;

            // Iterate over the JSON object
            if (table.tableInfo.id == "DailyMangaReleases") {
                for (var i = 0; i < resLen; i++) {
                var groupLen = Object.keys(feat.results[i].record.groups).length;
                    for (var j = 0; j < groupLen; j++) {
                        dailyRelData.push({
                            "Total_hits": feat.total_hits,
                            "Page": feat.page,
                            "Per_page": feat.per_page,
                            "id": feat.results[i].record.id,
                            "Title": feat.results[i].record.title,
                            "Volume": feat.results[i].record.volume,
                            "Chapter": feat.results[i].record.chapter,
                            "Group_name": feat.results[i].record.groups[j].name,
                            "Group_id": feat.results[i].record.groups[j].group_id,
                            "Release_date": feat.results[i].record.release_date,
                            "Series_id": feat.results[i].metadata.series.series_id
                    })};
                }
            }

            table.appendRows(dailyRelData);
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
