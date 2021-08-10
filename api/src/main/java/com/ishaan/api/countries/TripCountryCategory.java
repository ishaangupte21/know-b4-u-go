package com.ishaan.api.countries;

import lombok.Data;

import javax.xml.bind.annotation.*;

@Data
@XmlAccessorType(XmlAccessType.NONE)
public class TripCountryCategory {
    @XmlAttribute(name = "domain")
    private String domain;

    @XmlValue
    private String value;

    public TripCountryCategory() {
    }
}
