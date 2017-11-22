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
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        scrollView.contentSize = CGSize(width: 1000, height: 1000)
        scrollView.delegate = self
        scrollView.minimumZoomScale = 0.1
        scrollView.maximumZoomScale = 2.0
        
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


}

