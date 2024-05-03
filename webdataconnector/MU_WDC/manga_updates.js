(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
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

        var tableSchema = {
            id: "MangaGenre",
            alias: "Manga genres available in manga updates",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("http://localhost:8889/api.mangaupdates.com/v1/genres", function(resp) {
            var feat = resp,
                tableData = [];
            var len = Object.keys(resp).length
            console.log(feat)
            // Iterate over the JSON object
            for (var i = 0; i < len; i++) {
                tableData.push({
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

            table.appendRows(tableData);
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
