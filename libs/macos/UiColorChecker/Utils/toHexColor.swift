//
//  toHexColor.swift
//  UiColorChecker
//
//  Created by Ryky CE on 13/9/25.
//

import AppKit

private let color8Bits = 255

/// Transforms MacOS colors to hex strings
public func toHexColor( color:NSColor ) -> String? {
  guard let rgbColor: NSColor = color.usingColorSpace( .deviceRGB ) else {
    return nil
  }
  let red = Int( rgbColor.redComponent * Double( color8Bits ) )
  let green = Int( rgbColor.greenComponent * Double( color8Bits ) )
  let blue = Int( rgbColor.blueComponent * Double( color8Bits ) )
  return String( format:"#%02X%02X%02X", red, green, blue )
}
