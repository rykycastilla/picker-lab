//
//  ColorResponse.swift
//  UiColorChecker
//
//  Created by Ryky CE on 14/9/25.
//

import Foundation

extension Color {

  /// Standard format for packaging color info to be sent to another process
  public class ColorResponse: Domain.Output.Response {

    public typealias Status = Color.ColorStatus

    /// Milliseconds in a second
    private static let MILLISECONDS = 1000.0

    public let status: Color.ColorStatus

    /// Value of the specified color target. It will be `nil` if it is not a static color
    public let value: String?

    public let timeStamp: Int

    public init( isMulticolor:Bool, colorCode:String? ) {
      self.timeStamp = Self.genTimeStamp()
      if isMulticolor {
        self.status = Color.ColorStatus.multicolor
        self.value = nil
      }
      else if colorCode != nil {
        self.status = Color.ColorStatus.success
        self.value = colorCode
      }
      else {
        self.status = Color.ColorStatus.invalidColor
        self.value = nil
      }
    }

    /// Generating the `timeStamp` signature
    private static func genTimeStamp() -> Int {
      let date = Date()
      return Int( date.timeIntervalSince1970 * Self.MILLISECONDS )
    }

  }

}
