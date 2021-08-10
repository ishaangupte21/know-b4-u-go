package com.ishaan.api.countries;

import lombok.Data;
import lombok.Getter;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementRef;
import java.io.Serializable;
import java.util.List;

@Data
@XmlAccessorType(XmlAccessType.FIELD)
public class TripCountry implements Serializable {

    @XmlElement(name = "title")
    private String title;

    @XmlElement(name = "pubDate")
    private String pubDate;

    @XmlElement(name = "category")
    private List<TripCountryCategory> categories;

    public TripCountry() {
    }
}
