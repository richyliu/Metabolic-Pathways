//
//  ViewController.swift
//  Metabolic Pathways
//
//  Created by Xiaolan Zhou on 11/20/17.
//  Copyright © 2017 Richard Liu. All rights reserved.
//

import UIKit
import os.log

class ViewController: UIViewController, UIScrollViewDelegate {
    
    // MARK: Properties
    @IBOutlet weak var scrollView: UIScrollView!
    var mapView: UIView!
    var substances = Dictionary<String, Substance>()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        // init scrolling
        scrollView.contentSize = CGSize(width: 1000, height: 1000)
        scrollView.delegate = self
        scrollView.minimumZoomScale = 0.1
        scrollView.maximumZoomScale = 2.0
        
        loadSubstances()
        addSubstanceButtons()
        
//        addTestDiagram()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    // MARK: Scrolling
    func viewForZooming(in scrollView: UIScrollView) -> UIView? {
        os_log("zoom began", log: OSLog.default, type: .debug)
        return mapView
    }
    
    func scrollViewDidEndZooming(_ scrollView: UIScrollView, with view: UIView?, atScale scale: CGFloat) {
        os_log("zoom ended", log: OSLog.default, type: .debug)
    }
    
    
    // MARK: Button actions
    @objc func buttonClicked(sender: UIButton!) {
        os_log("button clicked", log: OSLog.default, type: .debug)
        performSegue(withIdentifier: "showSubstance", sender: sender)
    }
    
    
    // MARK: Navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        super.prepare(for: segue, sender: sender)
        
        switch(segue.identifier ?? "") {
        case "showSubstance":
            guard let substanceViewController = segue.destination as? SubstanceViewController else {
                fatalError("unexpected destination: \(segue.destination)")
            }
            guard let button = sender as? UIButton else {
                fatalError("unexpected sender: \(sender ?? "")")
            }
            
            substanceViewController.substance = substances[button.titleLabel!.text!]
        default:
            fatalError("Unexpected Segue Identifier; \(segue.identifier ?? "")")
        }
    }
    
    @IBAction func unwindToSubstanceButtons(sender: UIStoryboardSegue) {
        
    }
    
    
    // MARK: Private methods
    private func loadSubstances() {
        os_log("in load substances", log: OSLog.default, type: .debug)
        if let text = NSDataAsset(name: "substances") {
//            print(text.data)
//            print(String(data: text.data, encoding: String.Encoding.utf8)!)
            let csv = CSwiftV(with: String(data: text.data, encoding: String.Encoding.utf8)!)
            
            for item in csv.rows {
                let image = UIImage(named: item[0])
                let name = item[0]
                
//                print(name)
//                print(Array<String>(item[1...]))
//                print(csv.headers)
//                print(image)
                
                let newSubstance: Substance = Substance(name: name, properties: Array<String>(item[1...]), labels: csv.headers, image: image)
                
//                print(newSubstance)
                substances[name] = newSubstance
            }
        } else {
            os_log("failed to load substances file", log: OSLog.default, type: .debug)
        }
    }
    
    private func addSubstanceButtons() {
        os_log("in substance buttons", log: OSLog.default, type: .debug)
        // make stack view
        let stackView = UIStackView()
        stackView.axis = .vertical
        stackView.distribution = .fillEqually
        stackView.alignment = .fill
        stackView.spacing = 8
        stackView.translatesAutoresizingMaskIntoConstraints = false
        
        // add buttons to stack view
        for (name, _) in substances {
            let button = UIButton()
            button.setTitle(name, for: .normal)
            button.setTitleColor(UIColor.blue, for: .normal)
            button.addTarget(self, action: #selector(buttonClicked), for: .touchUpInside)
            
            stackView.addArrangedSubview(button)
        }
        
        scrollView.addSubview(stackView)
    }
    
    
    private func addTestDiagram() {
        mapView = MapView(frame: CGRect(x: 0, y: 0, width: 1000, height: 1000))
        mapView.backgroundColor = UIColor.white
        
        let label = UILabel(frame: CGRect(x: 25, y: 25, width: 150, height: 21))
        label.text = "word number 1"
        mapView.addSubview(label)
        
        let label2 = UILabel(frame: CGRect(x: 25, y: 225, width: 150, height: 21))
        label2.text = "word number 2"
        mapView.addSubview(label2)
        
        scrollView.addSubview(mapView)
    }


}

