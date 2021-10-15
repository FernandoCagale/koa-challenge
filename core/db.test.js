const rewire = require("rewire")
const db = rewire("./db")
const getName = db.__get__("getName")
// @ponicode
describe("db", () => {
    test("0", () => {
        let callFunction = () => {
            db()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getName", () => {
    test("0", () => {
        let callFunction = () => {
            getName()
        }
    
        expect(callFunction).not.toThrow()
    })
})
