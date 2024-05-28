export function dynamicSort(sort: string) {
    const sortObject: any = {
        createdAt: -1,
    }
    if (!sort) {
        return sortObject
    }
    sort = sort.trim()
    let sortlist = sort.split(',')
    // console.log(sortlist)
    sortlist.forEach((item) => {
        // console.log(item)
        const flag = item[0] == '-' ? -1 : 1
        // console.log(flag)
        if (flag == -1) {
            item = item.replace('-', '')
        }
        sortObject[item] = flag
    })
    return sortObject;
}

export function dynamicSearchandFilter(searchfields: any, searchTerm: string, maxBudget: any, minBudget: any, maxCollection: any, minCollection: any, genre: any, username: string, role: string, minDate: string, maxDate: string) {
    const matchObject: any = {}
    if (role == "actor") {
        matchObject["cast"] = username
    }
    else if (role !== "user" && role !== "admin") {
        matchObject[`${role}`] = username
    }
    if (genre) {
        matchObject["genre"] = {
            $regex: genre, $options: "i"
        }
    }

    if (searchTerm) {
        const searchQueryArray = searchfields.map((field: any) => {
            return {
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            }
        })
        // console.log(searchQueryArray)
        matchObject['$or'] = searchQueryArray;
    }
    if (minBudget) {
        matchObject['budget'] = {
            $gte: Number(minBudget)
        }
    }
    if (maxBudget) {
        matchObject['budget'] = {
            ...matchObject['budget'],
            $lte: Number(maxBudget),
        }
    }
    if (minCollection) {
        matchObject['collections'] = {
            $gte: Number(minCollection)
        }
    }
    if (maxCollection) {
        matchObject['collections'] = {
            ...matchObject['collections'],
            $lte: Number(maxCollection),
        }
    }
    // console.log(minDate)
    // console.log(maxDate)
    if (minDate) {
        matchObject['releaseDate'] = {
            $gte: new Date(minDate)
        }
    }
    if (maxDate) {

        matchObject['releaseDate'] = {
            ...matchObject['releaseDate'],
            $lte: new Date(maxDate)
        }
    }
    // console.log(matchObject)
    return matchObject
}


