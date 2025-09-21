//
//  AccentNotifier.swift
//  UiColorChecker
//
//  Created by Ryky CE on 14/9/25.
//

import Domain

extension Color {

  /// Sends color notifications to be processed by the observer's handlers
  public protocol AccentNotifier {

    /// Adds a handler to be executed when the observer detects color changes
    func addObserver( handle:@escaping ( Domain.Color.ColorEvent ) -> Void )

    /// Notify color changes (dispatch event)
    func dispatch( event:Domain.Color.ColorEvent )

  }

}
