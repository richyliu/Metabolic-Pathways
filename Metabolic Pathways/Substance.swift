//
//  Substance.swift
//  Metabolic Pathways
//
//  Created by Xiaolan Zhou on 11/26/17.
//  Copyright © 2017 Richard Liu. All rights reserved.
//

import UIKit

class Substance {
    
    // MARK: Properties
    var name: String
    var properties: [String]
    var labels: [String]
    var image: UIImage?
    
    // MARK: Initialization
    init(name: String, properties: [String], labels: [String], image: UIImage?) {
        self.name = name
        self.properties = properties
        self.labels = labels
        self.image = image
    }
}
