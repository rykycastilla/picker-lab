//
//  ColorResponseProcessor.swift
//  UiColorChecker
//
//  Created by Ryky CE on 14/9/25.
//

import Domain

extension Color {

  public class ColorResponseProcessor: Output.ResponseProcessor {

    public init() {}

    public func processResponse( event:Domain.Color.ColorEvent ) -> Domain.Color.ColorResponse {
      let isMulticolor: Bool = event.isMulticolor
      let code: String? = event.code
      return Domain.Color.ColorResponse( isMulticolor:isMulticolor, colorCode:code )
    }

  }

}
