/**
 * Created by guillaume on 22/01/2016.
 */

/**
 * This function is an id maker.
 * It makes unique id.
 */
function* idMaker () {
    var index = 0;
    while (index >= 0)
        yield index++;
}

module.exports = idMaker;