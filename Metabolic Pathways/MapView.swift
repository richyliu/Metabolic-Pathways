//
//  MapView.swift
//  Metabolic Pathways
//
//  Created by Xiaolan Zhou on 11/21/17.
//  Copyright © 2017 Richard Liu. All rights reserved.
//

import UIKit

class MapView: UIView {

    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func draw(_ rect: CGRect) {
        guard let ctx = UIGraphicsGetCurrentContext() else { return }
        ctx.setLineWidth(5)
        ctx.setStrokeColor(UIColor.gray.cgColor)
        
        ctx.addRect(CGRect(x: 0, y: 0, width: 200, height: 100))
        ctx.strokePath()
        
        ctx.addRect(CGRect(x: 0, y: 200, width: 200, height: 100))
        ctx.strokePath()
        
        ctx.beginPath()
        // body of arrow
        ctx.move(to: CGPoint(x: 100, y: 100))
        ctx.addLine(to: CGPoint(x: 100, y: 200))
        // left tip
        ctx.addLine(to: CGPoint(x: 85, y: 185))
        // right tip
        ctx.move(to: CGPoint(x: 100, y: 200))
        ctx.addLine(to: CGPoint(x: 115, y: 185))
        ctx.closePath()
        ctx.strokePath()
        
//        ctx.setFillColor(UIColor.green.cgColor)
//        ctx.addRect(CGRect(x: 30, y: 30, width: 90, height: 90))
//        ctx.fillPath()
    }

}
