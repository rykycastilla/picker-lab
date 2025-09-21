//
//  ColorEvent.swift
//  UiColorChecker
//
//  Created by Ryky CE on 14/9/25.
//

extension Color {

  /// Event for color config updates
  public class ColorEvent {

    /// If MacOS multicolor option was selected
    public let isMulticolor: Bool

    /// Value of the specified color target. It will be `nil` if it is not a static color
    public let code: String?

    public init( isMulticolor:Bool, code:String? ) {
      self.isMulticolor = isMulticolor
      self.code = code
    }

  }

}
