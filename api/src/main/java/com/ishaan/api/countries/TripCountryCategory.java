package com.ishaan.api.countries;

import lombok.Data;

import javax.xml.bind.annotation.*;
import java.io.Serializable;

@Data
@XmlAccessorType(XmlAccessType.NONE)
public class TripCountryCategory implements Serializable {
    @XmlAttribute(name = "domain")
    private String domain;

    @XmlValue
    private String value;

    public TripCountryCategory() {
    }
}
