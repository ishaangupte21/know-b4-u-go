package com.ishaan.api.countries;

import lombok.Data;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.util.List;

@Data
@XmlAccessorType(XmlAccessType.FIELD)
public class CountryChannel {
    @XmlElement(name = "title")
    private String title;

    @XmlElement(name = "item")
    private List<TripCountry> countries;

    public CountryChannel() {
    }
}
