//
//  ColorResponderJSONEncoder.swift
//  UiColorChecker
//
//  Created by Ryky CE on 14/9/25.
//

import Application
import Domain

extension Color {

  public class ColorResponderJSONEncoder: Application.Output.Encoder {

    /// JavaScript `null` value
    public static let null = "null"

    public typealias From = Domain.Color.ColorResponse
    public typealias To = String

    public init() {}

    /// Transforms `ColorResponse` to JSON strcutured data
    public func encode( from:Domain.Color.ColorResponse ) -> String {
      let status: Domain.Color.ColorStatus = from.status
      let value: String? = from.value
      var valueOut: String = value ?? Self.null
      if valueOut != Self.null { valueOut = "\"\( valueOut )\"" }
      let statusOut: String = status.rawValue
      let timeStamp: Int = from.timeStamp
      return #"{"status":"\#( statusOut )","value":\#( valueOut ),"timeStamp":\#( timeStamp )}"#
    }

  }

}
