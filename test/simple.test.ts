import "mocha"
import * as should from "should"

import mockup from "../dist"

describe("etty-mockup simple tests", () => {
	var locale = "en"
	var template = {
		field_1: "",
		field_2: "",
		field_3: ""
	}
	var prefilled = {
		field_1: "prefilled"
	}
	it("mockup simple from empty", done => {
		var expected = {
			field_1: "en:field_1",
			field_2: "en:field_2",
			field_3: "en:field_3",
		}
		should(mockup(template, locale)).eql(expected)
		done()
	})
	it("mockup simple from prefilled", done => {
		var expected = {
			field_1: "prefilled",
			field_2: "en:field_2",
			field_3: "en:field_3"
		}
		should(mockup(template, locale, prefilled)).eql(expected)
		done()
	})
})