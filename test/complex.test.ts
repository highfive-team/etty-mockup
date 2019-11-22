import "mocha"
import * as should from "should"

import mockup from "../dist"

describe("etty-mockup complex test", () => {
	var locale = "en"
	var template = {
		field_0: "",
		field_1: {
			sub_1: "",
			sub_2: ""
		},
		field_2: {
			sub_1: {
				subsub_1: [""],
				subsub_2: ""
			},
			sub_2: ["", "", ""],
			objectArray: [
				{ 
					a: "", 
					b: "" 
				}
			]
		}
	}
	var prefilled = {
		field_1: {
			sub_2: "sub_2 prefilled"
		},
		field_2: {
			sub_2: ["first", "second", "third"]
		}
	}
	var prefilledCorrupted = {
		field_1: "corrupted 1",
		field_2: "corrupted 2"
	}
	var expectedEmpty = {
		field_0: "en:field_0",
		field_1: {
			sub_1: "en:field_1.sub_1",
			sub_2: "en:field_1.sub_2"
		},
		field_2: {
			sub_1: {
				subsub_1: ["en:field_2.sub_1.subsub_1_0"],
				subsub_2: "en:field_2.sub_1.subsub_2"
			},
			sub_2: ["en:field_2.sub_2_0", "en:field_2.sub_2_1", "en:field_2.sub_2_2"],
			objectArray: [
				{ 
					a: "en:field_2.objectArray_0.a",
					b: "en:field_2.objectArray_0.b"
				}
			]
		}
	}

	var expectedPrefilled = {
		field_0: "en:field_0",
		field_1: {
			sub_1: "en:field_1.sub_1",
			sub_2: "sub_2 prefilled"
		},
		field_2: {
			sub_1: {
				subsub_1: ["en:field_2.sub_1.subsub_1_0"],
				subsub_2: "en:field_2.sub_1.subsub_2"
			},
			sub_2: ["first", "second", "third"],
			objectArray: [
				{ 
					a: "en:field_2.objectArray_0.a",
					b: "en:field_2.objectArray_0.b"
				}
			]
		}
	}

	it("mockup complex from empty", done => {
		should(mockup(template, locale)).eql(expectedEmpty)
		done()
	})
	it("mockup complex from prefilled", done => {
		should(mockup(template, locale, prefilled)).eql(expectedPrefilled)
		done()
	})
	it("mockup complex from corrupted prefill", done => {
		should(mockup(template, locale, prefilledCorrupted)).eql(expectedEmpty)
		done()
	})

})