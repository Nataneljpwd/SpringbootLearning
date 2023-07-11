package com.Nataneljwd.demo.deserializers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.Nataneljwd.demo.Models.Drawing;
import com.Nataneljwd.demo.Models.Drawing.Pixel;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

public class DrawingDeserializer extends StdDeserializer<Drawing> {

    public DrawingDeserializer() {
        this(null);
    }

    public DrawingDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public Drawing deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
        JsonNode node = jp.getCodec().readTree(jp);
        List<Pixel> pixels = new ArrayList<>();
        if (node.isArray()) {
            for (JsonNode el : node) {
                pixels.add(
                        new Pixel(el.get("color").asText(),
                                new int[] { el.get("pos").get(0).asInt(), el.get("pos").get(1).asInt() }));
            }
        }
        return new Drawing(pixels);
    }

}
