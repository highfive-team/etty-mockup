import "mocha"
import * as should from "should"

import mockup from "../dist"

describe("etty-mockup array test", () => {
	var locale = "en"
	var template = {
		array1: ["", ""],
		array2: [["", ""], ["", ""]],
		array3: [
			{ a: "", b: "" },
			{ a: "", b: "" }
		],
		array4: [
			[ { a: "", b: "" } ],
			[ { a: "", b: "" } ]
		],
		array5: [
			{ a: "", b: "", c: [ "", "", "" ]},
			{ a: "", b: "", c: [ "", "", "" ]}
		],
		array6: [
			[ { a: "", b: "", c: [ "", "", "" ]} ],
			[ { a: "", b: "", c: [ "", "", "" ]} ]
		],
		array7: [
			[ { a: "", b: "", c: [ { d: "" } ]} ],
			[ { a: "", b: "", c: [ { d: "" } ]} ]
		]
	}

	var expected = {
		array1: ["en:array1_0", "en:array1_1"],
		array2: [
			["en:array2_0_0", "en:array2_0_1"], 
			["en:array2_1_0", "en:array2_1_1"]
		],
		array3: [
			{ a: "en:array3_0.a", b: "en:array3_0.b" },
			{ a: "en:array3_1.a", b: "en:array3_1.b" }
		],
		array4: [
			[ { a: "en:array4_0_0.a", b: "en:array4_0_0.b" } ],
			[ { a: "en:array4_1_0.a", b: "en:array4_1_0.b" } ]
		],
		array5: [
			{ 
				a: "en:array5_0.a", 
				b: "en:array5_0.b", 
				c: [ "en:array5_0.c_0", "en:array5_0.c_1", "en:array5_0.c_2" ]
			},
			{ 
				a: "en:array5_1.a", 
				b: "en:array5_1.b", 
				c: [ "en:array5_1.c_0", "en:array5_1.c_1", "en:array5_1.c_2" ]
			},
		],
		array6: [
			[ { 
				a: "en:array6_0_0.a", 
				b: "en:array6_0_0.b", 
				c: [ "en:array6_0_0.c_0", "en:array6_0_0.c_1", "en:array6_0_0.c_2" ]
			} ],
			[ { 
				a: "en:array6_1_0.a", 
				b: "en:array6_1_0.b", 
				c: [ "en:array6_1_0.c_0", "en:array6_1_0.c_1", "en:array6_1_0.c_2" ]
			} ]
		],
		array7: [
			[ { 
				a: "en:array7_0_0.a", 
				b: "en:array7_0_0.b", 
				c: [ 
					{ d: "en:array7_0_0.c_0.d" } 
				]
			} ],
			[ { 
				a: "en:array7_1_0.a", 
				b: "en:array7_1_0.b", 
				c: [ 
					{ d: "en:array7_1_0.c_0.d" } 
				]
			} ]
		]
	}

	it("mockup complex arrays empty", done => {
		should(mockup(template, locale)).eql(expected)
		done()
	})
})