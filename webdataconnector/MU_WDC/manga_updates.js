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
        }];

        // var authorCols = [{
        //     id: "Total_series",
        //     dataType: tableau.dataTypeEnum.int
        // }, {
        //     id: "Title",
        //     alias: "Series title",
        //     dataType: tableau.dataTypeEnum.string
        // }, {
        //     id: "Series_id",
        //     alias: "series id",
        //     dataType: tableau.dataTypeEnum.int
        // }, {
        //     id: "Year",
        //     alias: "Series year",
        //     dataType: tableau.dataTypeEnum.int
        // }, {
        //     id: "Genres",
        //     alias: "genres",
        //     dataType: tableau.dataTypeEnum.string
        // }];


        var seriesInfoCols = [{
            id: "Series_id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Title",
            alias: "Series title",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Url",
            alias: "series url",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Description",
            alias: "Series description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Image_url",
            alias: "Series image url",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Type",
            alias: "Series type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Year",
            alias: "Series creation year",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Bayesian_rating",
            alias: "Series bayesian rating",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "Genres",
            alias: "genres",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Categories",
            alias: "Series categories",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Latest_chapter",
            alias: "Series current/last chapter",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Status",
            alias: "Series completion status",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "Anime_start",
            alias: "Start of anime adaption seasons series chapter",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Anime_end",
            alias: "End of anime adaption seasons series chapter",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Authors",
            alias: "Series author/artist information",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Publishers",
            alias: "Series publishers information",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Current_week_rank",
            alias: "Series current activity weekly ranking information",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Current_month_rank",
            alias: "Series current activity monthly ranking information",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Current_year_rank",
            alias: "Series current activity yearly ranking information",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Old_week_rank",
            alias: "Series old activity weekly ranking information",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Old_month_rank",
            alias: "Series old activity monthly ranking information",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Old_year_rank",
            alias: "Series old activity yearly ranking information",
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

        var dailyRelSchema = {
            id: "DailyMangaReleases",
            alias: "Manga daily release data",
            columns: dailyRelCols
        };

        // var authorSchema = {
        //     id: "AuthorSeries",
        //     alias: "Author series data",
        //     columns: authorCols
        // };

        var seriesInfoSchema = {
            id: "SeriesInformation",
            alias: "Comprehensive series data",
            columns: seriesInfoCols
        };



        schemaCallback([genreSchema, usersSchema, dailyRelSchema, seriesInfoSchema/*, authorSchema*/]);
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

        $.getJSON("http://localhost:8889/api.mangaupdates.com/v1/releases/days/?include_metadata=true", function(resp) {
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

        const series_id_arr = [64519011883, 15180124327, 51239621230, 55099564912, 19001585632, 47792036763, 18024418525];
        let CSV_data = [];

        for (let id of series_id_arr) {
            $.getJSON("http://localhost:8889/api.mangaupdates.com/v1/series/"+`${id}`, function(resp) {

                let feat = resp;
                let seriesInfoData = [];
                let genreLen = feat.genres.length;
                let categoryLen = feat.categories.length;
                let authorLen = feat.authors.length;
                let publisherLen = feat.publishers.length;

                // Iterate over the JSON object
                if (table.tableInfo.id == "SeriesInformation") {
                    let genStr = "";
                    let catStr = "";
                    let authStr = "";
                    let pubStr = "";

                    for (let i = 0; i < genreLen; i++) {
                        if (i === genreLen - 1) {
                            genStr += feat.genres[i].genre
                        } else {
                            genStr += feat.genres[i].genre + ","
                        }
                    };

                    for (let j = 0; j < categoryLen; j++) {
                        if (j === categoryLen - 1) {
                            catStr += feat.categories[j].category
                        } else {
                            catStr += feat.categories[j].category + ","
                        }
                    };

                    for (let k = 0; k < authorLen; k++) {
                        if (k === authorLen - 1) {
                            authStr += feat.authors[k].name + `(${feat.authors[k].type})`
                        } else {
                            authStr += feat.authors[k].name + `(${feat.authors[k].type})` + ", "
                        }
                    };

                    for (let m = 0; m < publisherLen; m++) {
                        if (m === publisherLen - 1) {
                            pubStr += feat.publishers[m].publisher_name + `(${feat.publishers[m].type})`
                        } else {
                            pubStr += feat.publishers[m].publisher_name + `(${feat.publishers[m].type})` + ", "
                        }
                    };

                    seriesInfoData.push({
                        "Series_id": feat.series_id,
                        "Title": feat.title,
                        "Url": `'${feat.url}'`,
                        "Description": feat.description,
                        "Image_url": `${feat.image.url.original}`,
                        "Type": feat.type,
                        "Year": feat.year,
                        "Bayesian_rating": feat.bayesian_rating,
                        "Genres": genStr,
                        "Categories": catStr,
                        "Latest_chapter": feat.latest_chapter,
                        "Status": feat.completed,
                        "Anime_start": feat.anime.start,
                        "Anime_end": feat.anime.end,
                        "Authors": authStr,
                        "Publishers": pubStr,
                        "Current_week_rank": feat.rank.position.week,
                        "Current_month_rank": feat.rank.position.month,
                        "Current_year_rank": feat.rank.position.year,
                        "Old_week_rank": feat.rank.old_position.week,
                        "Old_month_rank": feat.rank.old_position.month,
                        "Old_year_rank": feat.rank.old_position.year
                    });
                }

                if (CSV_data.length === 0) {
                    seriesInfoData.forEach(function (row) {
                        let values = Object.keys(row).map(function(value) {
                            return typeof(value) === 'string' ? `"${value}"` : value;
                        });
                        CSV_data.push(values.join(","));
                    });
                };
                seriesInfoData.forEach(function (row) {
                    let values = Object.values(row).map(function(value) {
                        return typeof(value) === 'string' ? `"${value}"` : value;
                    });
                    CSV_data.push(values.join(","));
                });


                if (CSV_data.length === series_id_arr.length + 1) {
                    let csv_blob = new Blob([CSV_data.join("\n")], {type: 'text/csv;charset=utf-8;'});
                    let csv_url = window.URL.createObjectURL(csv_blob);
                    let link = document.createElement("a");
                    link.href = csv_url;
                    link.download = "data.csv";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }

                table.appendRows(seriesInfoData);
                doneCallback();
            });
        }
    };

    // var authorBody = {
    //     "orderby": "title"
    // }
    // console.log(authorBody);
    // myConnector.postData = function(table, doneCallback) {
    //     var authorBody = {
    //         "orderby": "title"
    //     }
    //     console.log(authorBody);
    //
    //     $.postJSON("http://localhost:8889/api.mangaupdates.com/v1/authors/946927798/series", authorBody, function(resp) {
    //         var feat = resp,
    //             authorSeriesData = [];
    //         var seriesLen = Object.keys(resp).length;

    //         // Iterate over the JSON object
    //         if (table.tableInfo.id == "AuthorSeries") {
    //             for (var i = 0; i < seriesLen; i++) {
    //             // var genreLen = feat.series_list[i].genres.length;
    //             //     for (var j = 0; j < genreLen; j++) {
    //                     authorSeriesData.push({
    //                         "Total_series": feat.total_series,
    //                         "Title": feat.series_list[i].title,
    //                         "Series_id": feat.series_list[i].series_id,
    //                         "Year": feat.series_list[i].year
    //                         // "Genres": feat.series_list[i].genres[j]
    //                 })};
    //             // }

    //         }

    //         table.appendRows(authorSeriesData);
    //         doneCallback();
    //     });
    // };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Manga Updates API"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
