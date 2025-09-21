//
//  MacSystemColorConfig.swift
//  UiColorChecker
//
//  Created by Ryky CE on 13/9/25.
//

import Application
import Foundation

extension Color {

  public class MacSystemColorConfig: Application.Color.ColorConfig {

    public init() {}

    /// MacOS System multicolor status
    public var isMulticolor: Bool {
      let userConfig: UserDefaults = UserDefaults.standard
      let accentColorIndex: String? = userConfig.string( forKey:"AppleAccentColor" )
      return accentColorIndex == nil
    }

  }

}
