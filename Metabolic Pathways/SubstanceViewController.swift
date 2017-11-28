//
//  SubstanceViewController.swift
//  Metabolic Pathways
//
//  Created by Xiaolan Zhou on 11/26/17.
//  Copyright © 2017 Richard Liu. All rights reserved.
//

import UIKit
import os.log

class SubstanceViewController: UIViewController {

    // MARK: Properties
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var miscLabel: UILabel!
    @IBOutlet weak var stackView: UIStackView!
    
    var substance: Substance?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        if let sub = substance {
            nameLabel.text = sub.name
            miscLabel.text = "\(sub.properties[0]) \(sub.properties[1])"
            if let img = sub.image {
                print(img.size.width)
                print(img.size.height)
                print(img.scale)
                
                let imageView = UIImageView(frame: CGRect(x: 0, y: 0, width: img.size.width * img.scale, height: img.size.height * img.scale))
                imageView.image = img
                
                stackView.addArrangedSubview(imageView)
            } else {
                os_log("substance has no image", log: OSLog.default, type: .debug)
            }
        } else {
            fatalError("substance is nil")
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    

    
    // MARK: - Navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
    }
    

}
