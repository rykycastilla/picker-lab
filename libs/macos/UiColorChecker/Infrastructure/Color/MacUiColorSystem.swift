//
//  MacUiColorSystem.swift
//  UiColorChecker
//
//  Created by Ryky CE on 13/9/25.
//

import AppKit
import Application
import Utils

extension Color {

  public class MacUiColorSystem: Application.Color.ColorSystem {

    public init() {}

    /// MacOS System accent value
    public var accent: String? {
      let accentColor: NSColor = NSColor.controlAccentColor
      return toHexColor( color:accentColor )
    }

  }

}
